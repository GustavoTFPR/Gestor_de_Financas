// src/service/authService.ts
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/user";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(Usuario);

  login = async (email: string, password: string) => {

    if (!email || !password) {
      throw new BadRequestError("E-mail e senha são obrigatórios");
    }

    const user = await this.userRepository.findOne({
      where: { email },
      select: ["id", "nome", "senha"],
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado"); 
    }

    const senhaValida = await bcrypt.compare(password, user.senha);
    if (!senhaValida) {
      throw new UnauthorizedError("Senha inválida");    
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_PASS ?? "secret",
      { expiresIn: "8h" }
    );

    return { user: { name: user.nome, id: user.id }, token };
  };

  registro = async (nome: string, email: string, senha: string) => {
    if (!nome || !email || !senha) {
      throw new BadRequestError("Nome, e-mail e senha são obrigatórios");
    }

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestError("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = this.userRepository.create({ nome, email, senha: hashedPassword, saldo: 0 });
    await this.userRepository.save(newUser);
    return { message: "Usuário registrado com sucesso" };
  };
}