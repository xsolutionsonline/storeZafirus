import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CategoriasEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ default: true })
  activa: boolean;
}
