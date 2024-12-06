import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {
  estudiantes: any[] = [];

  constructor() {}

  ngOnInit() {
    this.cargarEstudiantes(); // Carga la lista al iniciar
  }

  /**
   * Carga la lista de estudiantes desde localStorage
   */
  cargarEstudiantes() {
    const storedEstudiantes = localStorage.getItem('scannedStudents');
    this.estudiantes = storedEstudiantes ? JSON.parse(storedEstudiantes) : [];
    console.log('Estudiantes cargados:', this.estudiantes); // Verificar datos cargados
  }
  

  /**
   * Elimina un estudiante de la lista
   */
  eliminarEstudiante(codigo: string) {
    this.estudiantes = this.estudiantes.filter((estudiante) => estudiante.codigo !== codigo);
    this.guardarEstudiantes();
  }

  /**
   * Guarda la lista de estudiantes actualizada en localStorage
   */
  guardarEstudiantes() {
    localStorage.setItem('scannedStudents', JSON.stringify(this.estudiantes));
  }
}
