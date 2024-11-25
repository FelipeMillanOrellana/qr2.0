export interface Alumno {
  codigo: string;
  nombre?: string; // El nombre puede ser opcional
  fecha: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
}
