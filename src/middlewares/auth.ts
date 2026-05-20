import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, AuthRequest, TipoUsuario } from '../types';

// ── autenticar ────────────────────────────────────────────────
/**
 * Intercepta a requisição, valida o Bearer Token e injeta
 * req.usuario com o payload do JWT.
 */
export function autenticar(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ erro: 'Token não fornecido. Use: Authorization: Bearer <token>.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    (req as AuthRequest).usuario = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ erro: 'Token expirado. Faça login novamente.' });
      return;
    }
    res.status(401).json({ erro: 'Token inválido.' });
  }
}

// ── apenasAdmin ───────────────────────────────────────────────
/**
 * Restringe o endpoint apenas a administradores.
 * Deve ser usado APÓS autenticar().
 */
export function apenasAdmin(req: Request, res: Response, next: NextFunction): void {
  const { usuario } = req as AuthRequest;
  if (usuario.tipo !== 'administrador') {
    res.status(403).json({ erro: 'Acesso restrito a administradores.' });
    return;
  }
  next();
}

// ── apenasProprioOuAdmin ──────────────────────────────────────
/**
 * Garante que o usuário só acesse seu próprio recurso,
 * a menos que seja administrador. Lê o ID de req.params.id.
 */
export function apenasProprioOuAdmin(req: Request, res: Response, next: NextFunction): void {
  const { usuario } = req as AuthRequest;
  const idAlvo = Number(req.params.id);

  if (usuario.tipo !== 'administrador' && usuario.id !== idAlvo) {
    res.status(403).json({ erro: 'Você não tem permissão para acessar este recurso.' });
    return;
  }
  next();
}

// ── permitirTipos ─────────────────────────────────────────────
/**
 * Factory: cria middleware que permite apenas os tipos listados.
 * Exemplo: permitirTipos('administrador')
 */
export function permitirTipos(...tipos: TipoUsuario[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { usuario } = req as AuthRequest;
    if (!tipos.includes(usuario.tipo)) {
      res.status(403).json({ erro: `Acesso permitido apenas para: ${tipos.join(', ')}.` });
      return;
    }
    next();
  };
}
