import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage {
  nombre: string = ''; // Variable para almacenar el nombre completo
  usuario: string = ''; // Variable para almacenar el nombre de usuario
  password: string = ''; // Variable para almacenar la contraseña
  role: string = ''; // Variable para almacenar el rol

  constructor(private router: Router) {}

  /**
   * Registra un nuevo usuario y lo guarda en el local storage.
   */
  registrarUsuario() {
    if (!this.nombre || !this.usuario || !this.password || !this.role) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Obtener usuarios registrados del Local Storage
    const usuariosRegistrados = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    // Validar si el usuario ya existe
    const usuarioExistente = usuariosRegistrados.find(
      (user: any) => user.usuario === this.usuario
    );

    if (usuarioExistente) {
      alert('El nombre de usuario ya está registrado. Por favor, elige otro.');
      return;
    }

    // Agregar el nuevo usuario
    usuariosRegistrados.push({
      nombre: this.nombre,
      usuario: this.usuario,
      password: this.password,
      role: this.role,
    });

    // Guardar usuarios actualizados en el Local Storage
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
    alert('Usuario registrado con éxito');

    // Redirigir al Dashboard con el usuario registrado
    this.router.navigate(['/dashboard'], {
      queryParams: { usuario: this.usuario },
    });
  }

  /**
   * Redirige al usuario a la página de inicio.
   */
  volverAlHome() {
    this.router.navigate(['/home']); // Redirige a la página Home
  }
}
