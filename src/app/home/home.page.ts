import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  usuario: string = ''; // Almacena el nombre de usuario ingresado
  password: string = ''; // Almacena la contraseña ingresada

  constructor(private router: Router) {}

  /**
   * Valida el usuario y redirige según el tipo de usuario.
   * @param userType - El tipo de usuario: 'profesor' o 'estudiante'.
   */
  goToDashboard(userType: string) {
    // Obtiene el array de usuarios registrados desde Local Storage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Busca el usuario que coincida con las credenciales y el rol seleccionado
    const usuarioValido = usuariosRegistrados.find(
      (user: any) => 
        user.usuario === this.usuario && 
        user.password === this.password && 
        user.role === userType
    );

    if (usuarioValido) {
      // Redirige al dashboard correspondiente según el rol
      if (userType === 'profesor') {
        this.router.navigate(['/profesor']);
      } else if (userType === 'estudiante') {
        this.router.navigate(['/dashboard']);
      }
    } else {
      alert('Usuario o contraseña incorrectos, o tipo de usuario no autorizado.');
    }
  }
}
