<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from '../models/asignatura.model';
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
<<<<<<< HEAD
export class ProfesorPage implements OnInit {
  usuario: string = 'Profesor'; // Nombre del usuario
  qrData: string | null = null; // Variable para el contenido del QR
  isQRCodeVisible: boolean = false; // Controla si el QR está visible

  asignaturas: Asignatura[] = []; // Lista de asignaturas
  nuevaAsignatura: Asignatura = { id: '', nombre: '', seccion: '' }; // Modelo para una nueva asignatura

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarAsignaturas();
  }

=======
export class ProfesorPage {
  usuario: string = 'Profesor'; // Nombre del usuario

  constructor(private router: Router) {}

>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  // Navegar a la página de contacto con parámetros
  goToContacto() {
    this.router.navigate(['/contacto'], {
      queryParams: { from: 'profesor', usuario: this.usuario },
    });
  }

<<<<<<< HEAD
  // Generar QR dinámico para el profesor
  generateQRCode() {
    this.qrData = `PROFESOR|${this.usuario}|${new Date().toISOString()}`;
    this.isQRCodeVisible = true;
    console.log('QR Data generado:', this.qrData);
  }

  // Registrar una nueva asignatura
  registrarAsignatura() {
    if (this.nuevaAsignatura.nombre && this.nuevaAsignatura.seccion) {
      const nueva: Asignatura = {
        ...this.nuevaAsignatura,
        id: Date.now().toString(), // Generar un ID único
      };
      this.asignaturas.push(nueva);
      this.guardarAsignaturas();
      this.nuevaAsignatura = { id: '', nombre: '', seccion: '' }; // Limpiar el formulario
      console.log('Asignatura registrada:', nueva);
    } else {
      console.error('Faltan datos para registrar la asignatura');
    }
  }

  // Generar código QR para una asignatura específica
  generarQRAsignatura(asignatura: Asignatura) {
    this.qrData = `ASIGNATURA|${asignatura.nombre}|SECCION|${asignatura.seccion}|FECHA|${new Date().toISOString()}`;
    this.isQRCodeVisible = true;
    console.log('QR generado:', this.qrData);
  }

  // Ocultar el código QR
  hideQRCode() {
    this.isQRCodeVisible = false;
  }

  // Guardar asignaturas en localStorage
  guardarAsignaturas() {
    localStorage.setItem('asignaturasProfesor', JSON.stringify(this.asignaturas));
  }

  // Cargar asignaturas desde localStorage
  cargarAsignaturas() {
    const storedData = localStorage.getItem('asignaturasProfesor');
    this.asignaturas = storedData ? JSON.parse(storedData) : [];
  }

  // Eliminar una asignatura
  eliminarAsignatura(id: string) {
    this.asignaturas = this.asignaturas.filter(asignatura => asignatura.id !== id);
    this.guardarAsignaturas();
    console.log(`Asignatura con ID ${id} eliminada.`);
  }

  

  // Cerrar sesión
=======
  // Método para generar un código QR
  generateQRCode() {
    const qrData = `PROFESOR|${this.usuario}|${new Date().toISOString()}`;
    console.log('Datos del QR:', qrData);

    // Aquí puedes implementar la lógica para generar el QR
    // Podrías usar una biblioteca como 'qrcode' para mostrarlo visualmente
  }

  // Método para simular cierre de sesión
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  logOut() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
