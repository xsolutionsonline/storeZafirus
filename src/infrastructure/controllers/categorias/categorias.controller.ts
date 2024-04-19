import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { CategoriasDto } from "src/application/dtos/categorias/categorias.dto";
import { CategoriasService } from "src/application/services/categorias/categorias.service";
import { Categorias } from "src/domain/models/categorias/categorias.model";

@Controller("categorias")
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async findAll(): Promise<Categorias[]> {
    return this.categoriasService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Categorias | null> {
    return this.categoriasService.findById(id);
  }

  @Post()
  async create(
    @Body() crearCategoriaDto: CategoriasDto,
  ): Promise<CategoriasDto> {
    return this.categoriasService.create(crearCategoriaDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() ActualizarCategoriaDto: CategoriasDto,
  ): Promise<CategoriasDto | null> {
    return this.categoriasService.update(id, ActualizarCategoriaDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<boolean> {
    return this.categoriasService.delete(id);
  }
}
