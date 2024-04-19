import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
} from "@nestjs/common";

import { ProductosDto } from "src/application/dtos/productos/productos.dto";
import { ProductosService } from "src/application/services/productos/productos.service";
import { Productos } from "src/domain/models/productos/productos.model";

@Controller("/productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Productos | null> {
    return this.productosService.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createProductDto: ProductosDto,
  ): Promise<ProductosDto> {
    return this.productosService.create(createProductDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() actualizarProductoDto: ProductosDto,
  ): Promise<ProductosDto | null> {
    return this.productosService.update(id, actualizarProductoDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<boolean> {
    return this.productosService.delete(id);
  }
}
