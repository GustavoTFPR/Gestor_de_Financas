import { NextFunction, Request, Response } from "express";
import { traService } from "../services/traService";

export class TraController {
    private traService = new traService();
  
    create = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await this.traService.create(req.body);
        res.status(201).json(user);
      } catch (error: unknown) {
        next(error);
      }
    };
  
    list = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const users = await this.traService.list();
        res.status(200).json(users);
      } catch (error: unknown) {
        next(error);
      }
    };
  
    update = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);
        const user = await this.traService.update(id, req.body);
        return res.status(200).json(user);
      } catch (error: unknown) {
        next(error);
      }
    };
  
    delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);
        const result = await this.traService.delete(id);
        res.status(200).json(result);
      } catch (error: unknown) {
        next(error);
      }
    };

    saldo = async (req: any, res: Response, next: NextFunction) => {
      try {
        const result = await this.traService.saldo(Number(req.params.id));
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    };
  }