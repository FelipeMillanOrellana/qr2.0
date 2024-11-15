import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage {
  usuario: string = 'Profesor'; // Nombre del usuario

  constructor(private router: Router) {}

  // Navegar a la página de contacto con parámetros
  goToContacto() {
    this.router.navigate(['/contacto'], {
      queryParams: { from: 'profesor', usuario: this.usuario },
    });
  }

  // Método para generar un código QR
  generateQRCode() {
    const qrData = `PROFESOR|${this.usuario}|${new Date().toISOString()}`;
    console.log('Datos del QR:', qrData);

    // Aquí puedes implementar la lógica para generar el QR
    // Podrías usar una biblioteca como 'qrcode' para mostrarlo visualmente
  }

  // Método para simular cierre de sesión
  logOut() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
