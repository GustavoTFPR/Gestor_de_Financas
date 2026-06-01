import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./user";
import { Categoria } from "./categoria";
export enum TipoTransacao {
  ENTRADA = "entrada", SAIDA = "saida"
}

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  valor!: number;

  @Column({ type: "varchar", enum: TipoTransacao })
  tipo!: TipoTransacao

  @Column({ type: "timestamp" })
  data!: Date



  @ManyToOne(() => Usuario, (usuario) => usuario.transacao, { onDelete: "CASCADE" })
  usuario!: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.transacao, { onDelete: "RESTRICT" })
  categoria!: Categoria;



}