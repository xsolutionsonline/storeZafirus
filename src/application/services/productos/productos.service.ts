import { Injectable } from "@nestjs/common";
import { ProductosDto } from "src/application/dtos/productos/productos.dto";
import { Productos } from "src/domain/models/productos/productos.model";
import { ProductosRepositoryImpl } from "src/infrastructure/persistence/repositories/productos/productos.repository";

@Injectable()
export class ProductosService {
  constructor(private readonly productosRepository: ProductosRepositoryImpl) {}

  async findAll(): Promise<Productos[]> {
    return this.productosRepository.findAll();
  }

  async findById(id: string): Promise<Productos | null> {
    return this.productosRepository.findById(id);
  }

  async create(crearProductoDto: ProductosDto): Promise<ProductosDto> {
    const product: Productos = {
      ...crearProductoDto,
      id: undefined,
    };
    return this.productosRepository.create(product);
  }

  async update(
    id: string,
    actualizarProductoDto: ProductosDto,
  ): Promise<ProductosDto | null> {
    return this.productosRepository.update(id, actualizarProductoDto);
  }

  async delete(id: string): Promise<boolean> {
    return this.productosRepository.delete(id);
  }
}
