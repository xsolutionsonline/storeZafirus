import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { CategoriasService } from "src/application/services/categorias/categorias.service";
import { ProductosService } from "src/application/services/productos/productos.service";
import { CategoriasController } from "src/infrastructure/controllers/categorias/categorias.controller";
import { ProductosController } from "src/infrastructure/controllers/productos/productos.controller";
import { CategoriasEntity } from "src/infrastructure/persistence/entities/categorias/categorias.entity";
import { ProductosEntity } from "src/infrastructure/persistence/entities/productos/productos.entity";
import { CategoriasRepositoryImpl } from "src/infrastructure/persistence/repositories/categorias/categorias.repository";
import { ProductosRepositoryImpl } from "src/infrastructure/persistence/repositories/productos/productos.repository";
config();

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductosEntity, CategoriasEntity]),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      autoLoadEntities: true,
      entities: [ProductosEntity, CategoriasEntity],
      synchronize: true,
    }),
  ],
  controllers: [ProductosController, CategoriasController],
  providers: [
    ProductosService,
    CategoriasService,
    ProductosRepositoryImpl,
    CategoriasRepositoryImpl,
  ],
})
export class AppModule {}
