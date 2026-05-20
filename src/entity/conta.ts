import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Usuario } from "./user";
   
  @Entity()
  export class Conta {
    @PrimaryGeneratedColumn()
    id!: number;
   
    @Column({ type: "decimal"})
    valorAdicionado!:number;

    @Column({ type: "decimal"})
    valorRetirado!:number;

    @ManyToOne(() => Usuario, (usuario) => usuario.conta)
    usuario!: Usuario;
   
    

  
   
  }