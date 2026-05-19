import { Request, Response, NextFunction } from 'express';

type RegrasCampo = {
  obrigatorio?: boolean;
  tipo?: 'string' | 'number' | 'boolean';
  minimo?: number;
  maximo?: number;
  enum?: string[];
  regex?: RegExp;
  mensagemRegex?: string;
};

type Schema = Record<string, RegrasCampo>;

/**
 * Factory de middleware de validação de body.
 * Uso: router.post('/', validarBody({ nome: { obrigatorio: true, tipo: 'string' } }), ctrl)
 */
export function validarBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const erros: string[] = [];
    const body = req.body as Record<string, unknown>;

    for (const [campo, regras] of Object.entries(schema)) {
      const valor = body[campo];

      if (regras.obrigatorio && (valor === undefined || valor === null || valor === '')) {
        erros.push(`Campo '${campo}' é obrigatório.`);
        continue;
      }
      if (valor === undefined || valor === null) continue;

      if (regras.tipo && typeof valor !== regras.tipo) {
        erros.push(`Campo '${campo}' deve ser do tipo ${regras.tipo}.`);
        continue;
      }

      if (regras.tipo === 'string') {
        const str = valor as string;
        if (regras.minimo && str.length < regras.minimo)
          erros.push(`'${campo}' deve ter ao menos ${regras.minimo} caracteres.`);
        if (regras.maximo && str.length > regras.maximo)
          erros.push(`'${campo}' deve ter no máximo ${regras.maximo} caracteres.`);
        if (regras.regex && !regras.regex.test(str))
          erros.push(regras.mensagemRegex ?? `'${campo}' tem formato inválido.`);
      }

      if (regras.tipo === 'number') {
        const num = valor as number;
        if (regras.minimo !== undefined && num < regras.minimo)
          erros.push(`'${campo}' deve ser maior ou igual a ${regras.minimo}.`);
        if (regras.maximo !== undefined && num > regras.maximo)
          erros.push(`'${campo}' deve ser menor ou igual a ${regras.maximo}.`);
      }

      if (regras.enum && !regras.enum.includes(valor as string)) {
        erros.push(`'${campo}' deve ser um dos valores: ${regras.enum.join(', ')}.`);
      }
    }

    if (erros.length > 0) {
      res.status(400).json({ erro: 'Dados inválidos.', detalhes: erros });
      return;
    }

    next();
  };
}

// ── Schemas prontos ──────────────────────────────────────────

export const schemaRegistro: Schema = {
  nome:  { obrigatorio: true,  tipo: 'string', minimo: 2, maximo: 100 },
  email: { obrigatorio: true,  tipo: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensagemRegex: "'email' inválido." },
  senha: { obrigatorio: true,  tipo: 'string', minimo: 8 },
  tipo:  { obrigatorio: false, enum: ['comum', 'administrador'] },
};

export const schemaLogin: Schema = {
  email: { obrigatorio: true, tipo: 'string' },
  senha: { obrigatorio: true, tipo: 'string' },
};

export const schemaCriarTransacao: Schema = {
  tipo:         { obrigatorio: true, enum: ['receita', 'despesa'] },
  valor:        { obrigatorio: true, tipo: 'number', minimo: 0.01 },
  data:         { obrigatorio: true, tipo: 'string', regex: /^\d{4}-\d{2}-\d{2}$/, mensagemRegex: "'data' deve estar no formato YYYY-MM-DD." },
  id_categoria: { obrigatorio: true, tipo: 'number', minimo: 1 },
};

export const schemaAlterarSenha: Schema = {
  senha_atual: { obrigatorio: true, tipo: 'string' },
  senha_nova:  { obrigatorio: true, tipo: 'string', minimo: 8 },
};
