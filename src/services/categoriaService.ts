import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/categoria";

export class CategoriaService {
  private categoriaRepository = AppDataSource.getRepository(Categoria);

  // CREATE
  create = async (dados: Partial<Categoria>) => {
    const novaCategoria = this.categoriaRepository.create(dados);
    return await this.categoriaRepository.save(novaCategoria);
  };

  // LIST
  list = async () => {
    return await this.categoriaRepository.find();
  };

  // DELETE
  delete = async (id: number) => {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) throw new Error("Categoria não encontrada");
    return await this.categoriaRepository.delete(id);
  };

  // UPDATE
  update = async (id: number, dados: Partial<Categoria>) => {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    this.categoriaRepository.merge(categoria, dados);
    return await this.categoriaRepository.save(categoria);
  };
}
