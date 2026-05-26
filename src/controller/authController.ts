// src/controller/authController.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService = new AuthService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  registro = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome, email, senha } = req.body;
      const result = await this.authService.registro(nome, email, senha);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}