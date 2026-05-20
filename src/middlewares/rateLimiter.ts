import { Request, Response, NextFunction } from 'express';

interface Tentativa {
  count: number;
  bloqueadoAte: number | null;
  ultimaTentativa: number;
}

// Armazenamento em memória (substituir por Redis em produção)
const tentativas = new Map<string, Tentativa>();

const MAX_TENTATIVAS = 5;
const JANELA_MS      = 15 * 60 * 1000; // 15 minutos
const BLOQUEIO_MS    = 30 * 60 * 1000; // 30 minutos

/**
 * Rate limiter para a rota de login.
 * Bloqueia o IP após MAX_TENTATIVAS falhas na janela de tempo.
 */
export function rateLimiterLogin(req: Request, res: Response, next: NextFunction): void {
  const ip  = req.ip ?? 'desconhecido';
  const now = Date.now();

  const registro = tentativas.get(ip) ?? { count: 0, bloqueadoAte: null, ultimaTentativa: now };

  // Verifica se está bloqueado
  if (registro.bloqueadoAte && now < registro.bloqueadoAte) {
    const restante = Math.ceil((registro.bloqueadoAte - now) / 60000);
    res.status(429).json({
      erro: `Muitas tentativas. IP bloqueado. Tente novamente em ${restante} minuto(s).`,
    });
    return;
  }

  // Reseta janela se passou o tempo
  if (now - registro.ultimaTentativa > JANELA_MS) {
    tentativas.set(ip, { count: 0, bloqueadoAte: null, ultimaTentativa: now });
  }

  // Incrementa tentativa (será decrementada no service se login OK)
  registro.count += 1;
  registro.ultimaTentativa = now;

  if (registro.count > MAX_TENTATIVAS) {
    registro.bloqueadoAte = now + BLOQUEIO_MS;
    tentativas.set(ip, registro);
    res.status(429).json({
      erro: 'Muitas tentativas de login. IP bloqueado por 30 minutos.',
    });
    return;
  }

  tentativas.set(ip, registro);

  // Expõe função para o service resetar em caso de sucesso
  (req as Request & { resetarTentativas: () => void }).resetarTentativas = () => {
    tentativas.delete(ip);
  };

  next();
}

/**
 * Rate limiter genérico para qualquer rota.
 * @param maxReqs — máximo de requisições por janela
 * @param janelaMs — duração da janela em ms
 */
export function rateLimiter(maxReqs: number, janelaMs: number) {
  const contadores = new Map<string, { count: number; inicio: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const ip  = req.ip ?? 'desconhecido';
    const now = Date.now();
    const reg = contadores.get(ip) ?? { count: 0, inicio: now };

    if (now - reg.inicio > janelaMs) {
      contadores.set(ip, { count: 1, inicio: now });
      next();
      return;
    }

    reg.count += 1;
    contadores.set(ip, reg);

    if (reg.count > maxReqs) {
      res.status(429).json({ erro: 'Limite de requisições atingido. Aguarde e tente novamente.' });
      return;
    }

    next();
  };
}
