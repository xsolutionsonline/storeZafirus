import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductosEntity } from "../productos/productos.entity";

@Entity()
export class CategoriasEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ default: true })
  activa: boolean;

  @OneToMany(() => ProductosEntity, (producto) => producto.categoria)
  productos: ProductosEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
