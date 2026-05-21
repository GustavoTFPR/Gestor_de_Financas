import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transacao } from "./transacao";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  nome: string;

  @Column({ type: "text", nullable: true })
  descricao?: string;

  @Column({ type: "varchar", length: 50, default: "ativo" })
  status: string;

  @OneToMany(() => Transacao, (transacao) => transacao.categoria)
  transacoes: Transacao[];
}
