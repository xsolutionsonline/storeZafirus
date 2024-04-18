import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Talle } from "../../enums/talle.enum";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ name: "id_categoria" })
  idCategoria: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio: number;

  @Column({ type: "varchar" })
  talle: Talle;
}
