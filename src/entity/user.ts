import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Transacao } from "./transacao";
import { Categoria } from "./categoria";
   
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

    @OneToMany(() => Categoria, (categoria) => categoria.usuario)
    categoria: Categoria[];
    
    @OneToMany(() => Transacao, (transacao) => transacao.usuario)
    transacao: Transacao[];

    
   
  
   
  }