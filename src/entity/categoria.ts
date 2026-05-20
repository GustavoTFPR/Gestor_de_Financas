import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transacao } from "./Transacao";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: "varchar", length: 100, unique: true })
  nome: string;

  @OneToMany(() => Transacao, (transacao) => transacao.categoria)
  transacoes: Transacao[];
}
