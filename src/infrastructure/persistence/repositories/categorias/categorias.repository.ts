import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoriasEntity } from "../../entities/categorias/categorias.entity";
import { Injectable } from "@nestjs/common";
import { CategoriasRepository } from "src/domain/repositories/categorias/categorias.repository";
import { CategoriasDto } from "src/application/dtos/categorias/categorias.dto";
import { Categorias } from "src/domain/models/categorias/categorias.model";

@Injectable()
export class CategoriasRepositoryImpl implements CategoriasRepository {
  constructor(
    @InjectRepository(CategoriasEntity)
    private readonly repository: Repository<CategoriasEntity>,
  ) {}

  async findAll(): Promise<Categorias[]> {
    const categorias = await this.repository.find();
    return categorias.map(this.entityToModel);
  }

  async findById(id: string): Promise<Categorias | null> {
    const categoria = await this.repository.findOne({ where: { id } });
    return categoria ? this.entityToModel(categoria) : null;
  }

  async create(categorias: Categorias): Promise<Categorias> {
    const nuevaCategory = this.repository.create(categorias);
    const guardarCategory = await this.repository.save(nuevaCategory);
    return this.entityToModel(guardarCategory);
  }

  async update(
    id: string,
    categoria: CategoriasDto,
  ): Promise<CategoriasDto | null> {
    const existeCategoria = await this.repository.findOne({ where: { id } });
    if (!existeCategoria) return null;

    const actualizarCategoria = { ...existeCategoria, ...categoria };
    await this.repository.save(actualizarCategoria);
    return this.entityToModel(actualizarCategoria);
  }

  async delete(id: string): Promise<boolean> {
    const resultado = await this.repository.delete(id);
    return resultado.affected > 0;
  }

  private entityToModel(categoriasEntity: CategoriasEntity): Categorias {
    return {
      id: categoriasEntity.id,
      nombre: categoriasEntity.nombre,
      descripcion: categoriasEntity.descripcion,
      activa: categoriasEntity.activa,
    };
  }
}
