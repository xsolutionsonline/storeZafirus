import { CreateProductDto } from "src/application/dtos/products/create-product.dto";
import { Product } from "src/domain/models/products/product.model";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(
    id: string,
    product: CreateProductDto,
  ): Promise<CreateProductDto | null>;
  delete(id: string): Promise<boolean>;
}
