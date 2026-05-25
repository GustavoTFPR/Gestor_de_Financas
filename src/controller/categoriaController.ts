import { NextFunction, Request, Response } from "express";
import { CategoriaService } from "../services/categoriaService";

export class CategoriaController {
  private categoriaService = new CategoriaService();

  // CREATE
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoria = await this.categoriaService.create(req.body);
      res.status(201).json(categoria);
    } catch (error: unknown) {
      next(error);
    }
  };

  // LIST
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categorias = await this.categoriaService.list();
      res.status(200).json(categorias);
    } catch (error: unknown) {
      next(error);
    }
  };

  // UPDATE
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const categoria = await this.categoriaService.update(id, req.body);
      return res.status(200).json(categoria);
    } catch (error: unknown) {
      next(error);
    }
  };

  // DELETE
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.categoriaService.delete(id);
      res.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  };
}
