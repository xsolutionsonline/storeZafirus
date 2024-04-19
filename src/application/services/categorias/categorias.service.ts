import { Injectable } from "@nestjs/common";
import { CategoriasDto } from "src/application/dtos/categorias/categorias.dto";
import { Categorias } from "src/domain/models/categorias/categorias.model";
import { CategoriasRepositoryImpl } from "src/infrastructure/persistence/repositories/categorias/categorias.repository";

@Injectable()
export class CategoriasService {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryImpl,
  ) {}

  async findAll(): Promise<Categorias[]> {
    return this.categoriasRepository.findAll();
  }

  async findById(id: string): Promise<Categorias | null> {
    return this.categoriasRepository.findById(id);
  }

  async create(crearCategoriaDto: CategoriasDto): Promise<Categorias> {
    const categoria: Categorias = {
      id: undefined,
      ...crearCategoriaDto,
    };
    return this.categoriasRepository.create(categoria);
  }

  async update(
    id: string,
    updateCategoriaDto: CategoriasDto,
  ): Promise<CategoriasDto | null> {
    return this.categoriasRepository.update(id, updateCategoriaDto);
  }

  async delete(id: string): Promise<boolean> {
    return this.categoriasRepository.delete(id);
  }
}
