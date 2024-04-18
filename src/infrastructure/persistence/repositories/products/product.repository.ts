import { EntityRepository, Repository } from "typeorm";
import { ProductRepository } from "../../../../domain/repositories/products/product.repository";
import { ProductEntity } from "../../entities/products/product.entity";
import { Product } from "src/domain/models/products/product.model";
import { CreateProductDto } from "src/application/dtos/products/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";

@EntityRepository(ProductEntity)
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { id } });
    return product ? this.entityToModel(product) : null;
  }

  async create(product: Product): Promise<Product> {
    const newProduct = this.repository.create(product);
    const savedProduct = await this.repository.save(newProduct);
    return savedProduct;
  }

  async update(
    id: string,
    product: CreateProductDto,
  ): Promise<CreateProductDto | null> {
    const existingProduct = await this.repository.findOne({ where: { id } });
    if (!existingProduct) return null;
    const updatedProduct = { ...existingProduct, ...product };
    await this.repository.save(updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  private entityToModel(productEntity: ProductEntity): Product {
    const { id, codigo, nombre, idCategoria, precio, talle } = productEntity;
    return { id, codigo, nombre, idCategoria, precio, talle };
  }
}
