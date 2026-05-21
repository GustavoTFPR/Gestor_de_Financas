import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/user";
import { BadRequestError } from "../helpers/apiError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  private userRepository = AppDataSource.getRepository(Usuario);
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findOne({
        where: { email },
        select: ["id", "nome", "senha"],
      });

      if (!user || !(await bcrypt.compare(password, user.senha))) {
        throw new BadRequestError("E-mail ou senha inválidos");
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_PASS ?? "secret",
        { expiresIn: "8h" }
      );
      return res.json({
        user: {
          name: user.nome,
          id: user.id,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  registro = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome, email, senha } = req.body;
      console.log("Dados recebidos para registro:", { nome, email, senha });
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        throw new BadRequestError("E-mail já cadastrado");
      }
      const hashedPassword = await bcrypt.hash(senha, 10);
      const newUser = this.userRepository.create({
        nome,
        email,
        senha: hashedPassword,
        saldo: 0,
        categoria: "Geral",
      });
      await this.userRepository.save(newUser);
      return res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
