import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/transacao";

export class traService {
  private transacaoRepository = AppDataSource.getRepository(Transacao)

  create = async (tra: Partial<Transacao>) => {
    const idtra = this.transacaoRepository.create(tra);
    return await this.transacaoRepository.save(idtra);
  };

  list = async () => {
    return await this.transacaoRepository.find({ relations: ["usuario", "categoria"] });
  };

  delete = async (id: number) => {
    const transacao = await this.transacaoRepository.findOneBy({ id });
    if (!transacao) throw new Error("transacao não encontrado");
    return await this.transacaoRepository.delete(id);
  };

  update = async (id: number, dados: Partial<Transacao>) => {
    const transacao = await this.transacaoRepository.findOneBy({ id });
    if (!transacao) {
      throw new Error("transacao não encontrado");
    }

  }
}