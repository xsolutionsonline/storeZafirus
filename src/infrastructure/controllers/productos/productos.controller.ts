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
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ProductosDto } from "src/application/dtos/productos/productos.dto";
import { ProductosService } from "src/application/services/productos/productos.service";
import { Productos } from "src/domain/models/productos/productos.model";

@ApiTags("este es el crud de productos ")
@Controller("/productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todos los productos" })
  async findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }

  @Get("/findById/:id")
  @ApiOperation({ summary: "Obtener un producto por su ID" })
  @ApiParam({
    name: "id",
    description: "ID del producto que deseamos buscar",
    type: "string",
  })
  async findById(@Param("id") id: string): Promise<Productos | null> {
    return this.productosService.findById(id);
  }

  @Get("/findAllActiveCategories/")
  @ApiOperation({
    summary:
      "Obtener todos los productos que su categoría se encuentre en estado  activa",
  })
  async findAllWithActiveCategories(): Promise<Productos[]> {
    return this.productosService.findAllWithActiveCategories();
  }

  @Get("/ByTalleMediumOrLarge/")
  @ApiOperation({
    summary: "Obtener productos donde su talle  se de tipo MEDIUM o LARGE",
  })
  async findProductsByTalleMediumOrLarge(): Promise<Productos[]> {
    return this.productosService.findProductsByTalleMediumOrLarge();
  }

  @Post()
  @ApiOperation({ summary: "Crear un nuevo producto" })
  @ApiResponse({
    status: 201,
    description: "El producto ha sido creado exitosamente",
  })
  @ApiResponse({ status: 400, description: "Petición incorrecta" })
  async create(
    @Body(new ValidationPipe()) createProductDto: ProductosDto,
  ): Promise<ProductosDto> {
    return this.productosService.create(createProductDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Actualizar un producto existente por su ID" })
  @ApiParam({ name: "id", description: "ID del producto", type: "string" })
  async update(
    @Param("id") id: string,
    @Body() actualizarProductoDto: ProductosDto,
  ): Promise<ProductosDto | null> {
    return this.productosService.update(id, actualizarProductoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un producto por su ID" })
  @ApiParam({ name: "id", description: "ID del producto", type: "string" })
  @ApiResponse({
    status: 200,
    description: "El producto ha sido eliminado exitosamente",
  })
  @ApiResponse({ status: 404, description: "El producto no fue encontrado" })
  async delete(@Param("id") id: string): Promise<boolean> {
    return this.productosService.delete(id);
  }
}
