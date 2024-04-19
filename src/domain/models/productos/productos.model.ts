import { Talle } from "src/infrastructure/persistence/enums/talle.enum";
import { Categorias } from "../categorias/categorias.model";

export interface Productos {
  id: string;
  codigo: string;
  nombre: string;
  categoria: Categorias;
  precio: number;
  talle: Talle;
}
