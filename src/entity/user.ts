import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Transacao } from "./transacao";
   
  @Entity()
  export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;
   
    @Column({ type: "varchar"})
    nome!: string;
   
    @Column({ type: "varchar", unique: true, nullable: false  })
    email!: string;
   
    @Column({ type: "varchar", select: false })
    senha!: string;

    @Column({ type: "decimal"})
    saldo!:number;

    @Column({ type: "varchar", nullable: true })
    categoria!: string;
    
    @OneToMany(() => Transacao, (transacao) => transacao.usuario)
    transacao: Transacao[];

    
   
  
   
  }