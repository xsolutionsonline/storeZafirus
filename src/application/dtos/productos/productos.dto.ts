import { Talle } from "src/infrastructure/persistence/enums/talle.enum";
import { IsNotEmpty, IsString, MaxLength, IsEnum } from "class-validator";
import { Categorias } from "src/domain/models/categorias/categorias.model";
export class ProductosDto {
  @IsNotEmpty({ message: 'El campo "codigo" es obligatorio' })
  @IsString({ message: 'El campo "codigo" debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El campo "codigo" no puede tener más de 100 caracteres',
  })
  readonly codigo: string;

  @IsNotEmpty({ message: 'El campo "nombre" es obligatorio' })
  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'El campo "nombre" no puede tener más de 100 caracteres',
  })
  readonly nombre: string;

  readonly categoria: Categorias;

  @IsNotEmpty({ message: 'El campo "precio" es obligatorio' })
  readonly precio: number;

  @IsNotEmpty({ message: 'El campo "talle" es obligatorio' })
  @IsString()
  @IsEnum(Talle, {
    message:
      "El talle debe ser uno de los siguientes valores: SMALL, MEDIUM, LARGE, EXTRA_LARGE",
  })
  readonly talle: Talle;
}
