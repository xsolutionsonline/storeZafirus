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
    const producto = await this.repository.find({
      relations: ["categoria"],
    });
    return producto.map(this.entityToModel);
  }

  async findById(id: string): Promise<Productos | null> {
    const producto = await this.repository.findOne({
      where: { id },
      relations: ["categoria"],
    });
    return producto ? this.entityToModel(producto) : null;
  }

  async findAllWithActiveCategories(): Promise<Productos[]> {
    const producto = await this.repository.find({
      relations: ["categoria"],
      where: {
        categoria: {
          activa: true,
        },
      },
    });
    return producto.map(this.entityToModel);
  }

  async findProductsByTalleMediumOrLarge(): Promise<Productos[]> {
    return this.repository
      .createQueryBuilder("producto")
      .where("producto.talle = :talle1 OR producto.talle = :talle2", {
        talle1: "MEDIUM",
        talle2: "LARGE",
      })
      .getMany();
  }

  async create(producto: ProductosDto): Promise<ProductosDto> {
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
    return actualizaProducto;
  }

  async delete(id: string): Promise<boolean> {
    const resultado = await this.repository.delete(id);
    return resultado.affected > 0;
  }

  private entityToModel(productoEntity: ProductosEntity): Productos {
    const { id, codigo, nombre, categoria, precio, talle } = productoEntity;
    return { id, codigo, nombre, categoria, precio, talle };
  }
}
