import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/apiError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }

  return res.status(500).json({ message: "Erro interno do servidor" });
};
