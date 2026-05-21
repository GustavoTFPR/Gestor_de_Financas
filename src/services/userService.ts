
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entity/user";
 

export class UserService{
  private usuarioRepository = AppDataSource.getRepository(Usuario)

  create= async (usu: Partial<Usuario>) => {
    const idusu = this.usuarioRepository.create(usu);
    return await this.usuarioRepository.save(idusu);
  };

  list = async () => {
    return await this.usuarioRepository.find();
  };

  delete = async (id: number) => {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error("usuario não encontrado");
    return await this.usuarioRepository.delete(id);
  };

  update = async (id: number, dados: Partial<Usuario>) => {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new Error("usuario não encontrado");
    }
  
}
}