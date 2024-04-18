import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsService } from "src/application/services/products/products.service";
import { ProductsController } from "src/infrastructure/controllers/products/products.controller";
import { ProductEntity } from "src/infrastructure/persistence/entities/products/product.entity";
import { ProductRepositoryImpl } from "../../infrastructure/persistence/repositories/products/product.repository";
import { config } from "dotenv";
config();

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      autoLoadEntities: true,
      entities: [ProductEntity],
      synchronize: true,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepositoryImpl],
})
export class AppModule {}
