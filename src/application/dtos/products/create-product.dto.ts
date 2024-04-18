import { Talle } from "src/infrastructure/persistence/enums/talle.enum";

export class CreateProductDto {
  codigo: string;
  nombre: string;
  idCategoria: string;
  precio: number;
  talle: Talle;
}
