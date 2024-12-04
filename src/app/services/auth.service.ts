import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Simulación de usuarios registrados
  private usuariosRegistrados = [
    { usuario: 'profesor1', password: '1234', role: 'profesor' },
    { usuario: 'estudiante1', password: 'abcd', role: 'estudiante' },
  ];

  validarCredenciales(usuario: string, password: string) {
    return this.usuariosRegistrados.find(
      (u) => u.usuario === usuario && u.password === password
    );
  }
}
