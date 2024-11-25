import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {

  // Arreglo para almacenar los estudiantes escaneados
  estudiantes: any[] = [];

  constructor() { }

  ngOnInit() {
    // Si tienes un servicio para obtener los datos escaneados, los puedes cargar aquí
  }

  // Función para agregar un estudiante a la lista
  agregarEstudiante(estudiante: any) {
    this.estudiantes.push(estudiante);
  }

  // Función para eliminar un estudiante
  eliminarEstudiante(id: number) {
    this.estudiantes = this.estudiantes.filter(estudiante => estudiante.id !== id);
  }
}
