import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from '../models/asignatura.model';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  usuario: string = 'Profesor'; // Nombre del usuario
  qrData: string | null = null; // Datos para el QR
  isQRCodeVisible: boolean = false; // Controla la visibilidad del QR
  asignaturas: Asignatura[] = []; // Lista de asignaturas
  nuevaAsignatura: Asignatura = { id: '', nombre: '', seccion: '' }; // Modelo de nueva asignatura

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarAsignaturas();
  }

  // Navegar a la página de contacto
  goToContacto() {
    this.router.navigate(['/contacto'], {
      queryParams: { from: 'profesor', usuario: this.usuario },
    });
  }

  // Generar QR para el usuario
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
        id: Date.now().toString(), // ID único basado en la fecha
      };
      this.asignaturas.push(nueva);
      this.guardarAsignaturas();
      this.nuevaAsignatura = { id: '', nombre: '', seccion: '' }; // Resetear formulario
      console.log('Asignatura registrada:', nueva);
    } else {
      console.error('Por favor completa todos los campos.');
    }
  }

  // Generar QR para una asignatura específica
  generarQRAsignatura(asignatura: Asignatura) {
    this.qrData = `ASIGNATURA|${asignatura.nombre}|SECCION|${asignatura.seccion}|FECHA|${new Date().toISOString()}`;
    this.isQRCodeVisible = true;
    console.log('QR generado para la asignatura:', this.qrData);
  }

  // Ocultar QR
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
  logOut() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}
