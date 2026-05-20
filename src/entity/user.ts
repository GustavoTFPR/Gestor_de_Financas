import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Conta } from "./conta";
   
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
    

    @OneToMany(() => Conta, (conta) => conta.usuario)
    conta: Conta[];
   
  
   
  }