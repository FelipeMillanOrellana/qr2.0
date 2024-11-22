import { Component } from '@angular/core';
import { Alumno } from '../../models/alumno.model'; // Ajusta el path según tu estructura

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage {
  alumnosEscaneados: Alumno[] = []; // Lista de alumnos escaneados

  constructor() {
    // Recuperar datos del Local Storage al cargar la página
    const alumnosGuardados = localStorage.getItem('alumnosEscaneados');
    this.alumnosEscaneados = alumnosGuardados ? JSON.parse(alumnosGuardados) : [];
  }

  eliminarAlumno(index: number) {
    // Eliminar alumno de la lista y actualizar Local Storage
    this.alumnosEscaneados.splice(index, 1);
    localStorage.setItem('alumnosEscaneados', JSON.stringify(this.alumnosEscaneados));
  }
}
