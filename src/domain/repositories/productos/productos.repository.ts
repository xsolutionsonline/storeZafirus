import { ProductosDto } from "src/application/dtos/productos/productos.dto";
import { Productos } from "src/domain/models/productos/productos.model";

export interface ProductosRepository {
  findAll(): Promise<Productos[]>;
  findAllWithActiveCategories(): Promise<Productos[]>;
  findProductsByTalleMediumOrLarge(): Promise<Productos[]>;
  findById(id: string): Promise<Productos | null>;
  create(product: ProductosDto): Promise<ProductosDto>;
  update(id: string, product: ProductosDto): Promise<ProductosDto | null>;
  delete(id: string): Promise<boolean>;
}
