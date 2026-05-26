// src/service/authService.ts
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/user";
import { BadRequestError } from "../helpers/apiError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(Usuario);

  login = async (email: string, password: string) => {
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

    return {
      user: { name: user.nome, id: user.id },
      token,
    };
  };

  registro = async (nome: string, email: string, senha: string) => {
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
    });

    await this.userRepository.save(newUser);
    return { message: "Usuário registrado com sucesso" };
  };
}