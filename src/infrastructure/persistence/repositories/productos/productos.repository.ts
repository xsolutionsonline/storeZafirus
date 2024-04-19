import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductosEntity } from "../../entities/productos/productos.entity";
import { Injectable } from "@nestjs/common";
import { ProductosRepository } from "src/domain/repositories/productos/productos.repository";
import { Productos } from "src/domain/models/productos/productos.model";
import { ProductosDto } from "src/application/dtos/productos/productos.dto";

@Injectable()
export class ProductosRepositoryImpl implements ProductosRepository {
  constructor(
    @InjectRepository(ProductosEntity)
    private readonly repository: Repository<ProductosEntity>,
  ) {}

  async findAll(): Promise<Productos[]> {
    const producto = await this.repository.find();
    return producto.map(this.entityToModel);
  }

  async findById(id: string): Promise<Productos | null> {
    const producto = await this.repository.findOne({ where: { id } });
    return producto ? this.entityToModel(producto) : null;
  }

  async create(producto: Productos): Promise<Productos> {
    const nuevoProducto = this.repository.create(producto);
    const guardarProducto = await this.repository.save(nuevoProducto);
    return this.entityToModel(guardarProducto);
  }

  async update(
    id: string,
    producto: ProductosDto,
  ): Promise<ProductosDto | null> {
    const existeProducto = await this.repository.findOne({ where: { id } });
    if (!existeProducto) return null;
    const actualizaProducto = { ...existeProducto, ...producto };
    await this.repository.save(actualizaProducto);
    return this.entityToModel(actualizaProducto);
  }

  async delete(id: string): Promise<boolean> {
    const resultado = await this.repository.delete(id);
    return resultado.affected > 0;
  }

  private entityToModel(productoEntity: ProductosEntity): Productos {
    const { id, codigo, nombre, idCategoria, precio, talle } = productoEntity;
    return { id, codigo, nombre, idCategoria, precio, talle };
  }
}
