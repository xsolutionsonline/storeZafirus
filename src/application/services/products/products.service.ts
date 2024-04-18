import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "../../dtos/products/create-product.dto";
import { Product } from "src/domain/models/products/product.model";
import { ProductRepositoryImpl } from "src/infrastructure/persistence/repositories/products/product.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepositoryImpl) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = {
      ...createProductDto,
      id: undefined,
    };
    return this.productRepository.create(product);
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<CreateProductDto | null> {
    return this.productRepository.update(id, updateProductDto);
  }

  async delete(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}
