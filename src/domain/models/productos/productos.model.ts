import { Talle } from "src/infrastructure/persistence/enums/talle.enum";

export interface Productos {
  id: string;
  codigo: string;
  nombre: string;
  idCategoria: string;
  precio: number;
  talle: Talle;
}
