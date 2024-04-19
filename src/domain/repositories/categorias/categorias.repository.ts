import { CategoriasDto } from "src/application/dtos/categorias/categorias.dto";
import { Categorias } from "src/domain/models/categorias/categorias.model";

export interface CategoriasRepository {
  findAll(): Promise<Categorias[]>;
  findById(id: string): Promise<Categorias | null>;
  create(category: CategoriasDto): Promise<CategoriasDto>;
  update(id: string, category: CategoriasDto): Promise<CategoriasDto | null>;
  delete(id: string): Promise<boolean>;
}
