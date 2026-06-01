import { AppDataSource } from "../data-source";
import { TipoTransacao, Transacao } from "../entity/transacao";
import { Usuario } from "../entity/user";
import { BadRequestError, NotFoundError } from "../helpers/apiError";

export class traService {
  private transacaoRepository = AppDataSource.getRepository(Transacao)
  private usuarioRepository = AppDataSource.getRepository(Usuario)

  create = async (tra: Partial<Transacao>) => {
    const { valor, tipo, data, usuario } = tra;
  
    if (!valor || !tipo || !data || !usuario) {          
      throw new BadRequestError("Campos obrigatórios: valor, tipo, data, usuario");
    }
  
    const usuarioExiste = await this.usuarioRepository.findOneBy({ id: (usuario as any).id });
    if (!usuarioExiste) throw new NotFoundError("Usuário não encontrado");
  
    const nova = this.transacaoRepository.create(tra);
    return await this.transacaoRepository.save(nova);
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

  };


  saldo = async (usuarioId: number) => {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) throw new NotFoundError("Usuário não encontrado");

    const transacoes = await this.transacaoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ["categoria"],
      order: { data: "DESC" },
    });

    const { entradas } = await this.transacaoRepository
      .createQueryBuilder("transacao")
      .select("SUM(transacao.valor)", "entradas")
      .where("transacao.usuarioId = :id", { id: usuarioId })
      .andWhere("transacao.tipo = :tipo", { tipo: TipoTransacao.ENTRADA })
      .getRawOne();
    const { saidas } = await this.transacaoRepository
      .createQueryBuilder("transacao")
      .select("SUM(transacao.valor)", "saidas")
      .where("transacao.usuarioId = :id", { id: usuarioId })
      .andWhere("transacao.tipo = :tipo", { tipo: TipoTransacao.SAIDA })
      .getRawOne();

    const total = entradas - saidas

    return {
      saldoAtual: total,
      totalEntradas: entradas,
      totalSaidas: saidas,
      transacoes,
    };
  };



}