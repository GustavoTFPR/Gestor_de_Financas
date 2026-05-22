import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/user";
import { BadRequestError } from "../helpers/apiError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export class UserService {
  private usuarioRepository = AppDataSource.getRepository(Usuario)

  create = async (data: Partial<Usuario>) => {
    const { email, senha, nome } = data
    const existingUser = await this.usuarioRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestError("E-mail já cadastrado");
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = this.usuarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
      saldo: 0,
    });
    return await this.usuarioRepository.save(newUser);
  };

  list = async () => {
    return await this.usuarioRepository.find();
  };

  delete = async (id: number) => {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error("usuario não encontrado");
    await this.usuarioRepository.delete(id);
    return { message: "usuario deletado " }
  };

  update = async (id: number, dados: Partial<Usuario>) => {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new Error("usuario não encontrado");
    }
    const usuarioatt = this.usuarioRepository.merge(usuario, dados)
      return await this.usuarioRepository.save(usuarioatt)

  }
}