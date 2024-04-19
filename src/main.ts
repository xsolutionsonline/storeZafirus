import { NestFactory } from "@nestjs/core";
import { AppModule } from "./presentation/api/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Store Zafiru")
    .setDescription(
      "Aplicación creada por Jerry Restrepo para prueba técnica desarrollador backend nest js",
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(3000);
}
bootstrap();
