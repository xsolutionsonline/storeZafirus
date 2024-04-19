import { Injectable } from "@nestjs/common";
import { CategoriasDto } from "src/application/dtos/categorias/categorias.dto";
import { Categorias } from "src/domain/models/categorias/categorias.model";
import { CategoriasRepositoryImpl } from "src/infrastructure/persistence/repositories/categorias/categorias.repository";
import { v4 as uuidv4 } from "uuid";

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
      id: uuidv4(),
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
