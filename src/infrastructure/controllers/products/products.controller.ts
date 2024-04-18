import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ProductsService } from "../../../application/services/products/products.service";
import { CreateProductDto } from "../../../application/dtos/products/create-product.dto";
import { Product } from "src/domain/models/products/product.model";

@Controller("/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<CreateProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Product | null> {
    return this.productsService.findById(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<CreateProductDto | null> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<boolean> {
    return this.productsService.delete(id);
  }
}
