import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage {
  nombre: string = '';
  email: string = '';
  password: string = '';
  tipoUsuario: string = '';

  constructor(private router: Router) {}

  registrarse() {
    if (!this.nombre || !this.email || !this.password || !this.tipoUsuario) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Simula el registro y redirige según el tipo de usuario
    console.log('Datos de registro:', {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      tipoUsuario: this.tipoUsuario,
    });

    if (this.tipoUsuario === 'profesor') {
      this.router.navigate(['/profesor']);
    } else if (this.tipoUsuario === 'estudiante') {
      this.router.navigate(['/dashboard']);
    }
  }
}
