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
import { APP_INTERCEPTOR } from "@nestjs/core";
import { DuplicateEntryInterceptor } from "src/interceptors/DuplicateEntry.interceptor";
import { NotFoundInterceptor } from "src/interceptors/NotFound.interceptor";
import { ApiResponseInterceptor } from "src/interceptors/ApiResponse.interceptor";
import { SwaggerModule } from "@nestjs/swagger";
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
    SwaggerModule,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DuplicateEntryInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
  ],
})
export class AppModule {}
