import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Transacao } from "./transacao";
import { Usuario } from "./user";

@Entity()
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
  transacao: Transacao[];

  @ManyToOne(() => Usuario, (usuario) => usuario.categoria, { onDelete: "CASCADE" })
  usuario!: Usuario | null;
}
