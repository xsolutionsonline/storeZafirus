import { Talle } from "src/infrastructure/persistence/enums/talle.enum";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
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

  @IsNotEmpty({ message: 'El campo "categoria" es obligatorio' })
  readonly idCategoria: string;

  @IsNotEmpty({ message: 'El campo "precio" es obligatorio' })
  readonly precio: number;

  @IsNotEmpty({ message: 'El campo "talle" es obligatorio' })
  @IsString()
  readonly talle: Talle;
}
