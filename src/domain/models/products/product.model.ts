import { Talle } from "src/infrastructure/persistence/enums/talle.enum";

export interface Product {
  id: string;
  codigo: string;
  nombre: string;
  idCategoria: string;
  precio: number;
  talle: Talle;
}
