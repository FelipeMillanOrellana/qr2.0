import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  usuario: string = ''; // Variable para almacenar el usuario
  password: string = ''; // Variable para almacenar la contraseña

  constructor(private router: Router) {}

  /**
   * Redirige al usuario al dashboard correspondiente según su tipo.
   * @param userType - El tipo de usuario: 'profesor' o 'estudiante'.
   */
  goToDashboard(userType: string) {
    if (userType === 'estudiante') {
      // Redirige al dashboard del estudiante
      this.router.navigate(['/dashboard']);
    } else if (userType === 'profesor') {
      // Redirige al dashboard del profesor
      this.router.navigate(['/profesor']);
    }
  }
}
