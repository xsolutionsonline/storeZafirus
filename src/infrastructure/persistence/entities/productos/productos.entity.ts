import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Talle } from "../../enums/talle.enum";
import { CategoriasEntity } from "../categorias/categorias.entity";

@Entity()
export class ProductosEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @ManyToOne(() => CategoriasEntity)
  @JoinColumn({ name: "id_categoria" })
  categoria: CategoriasEntity;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio: number;

  @Column({ type: "varchar" })
  talle: Talle;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
