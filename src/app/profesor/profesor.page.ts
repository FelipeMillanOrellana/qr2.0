import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage {
  usuario: string = 'Profesor'; // Nombre del usuario
  nuevaAsignatura = { nombre: '', seccion: '' }; // Modelo de asignatura
  asignaturas: { id: string; nombre: string; seccion: string }[] = []; // Lista de asignaturas
  qrData: string | null = null; // Datos para generar el QR

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  // Navegar a la página de contacto
  goToContacto() {
    this.navCtrl.navigateForward(['/contacto']);
  }

  // Navegar a la lista de alumnos
  goToListaAlumnos() {
    this.navCtrl.navigateForward(['/lista-alumnos']);
  }

  // Registrar una nueva asignatura
  async registrarAsignatura() {
    if (!this.nuevaAsignatura.nombre || !this.nuevaAsignatura.seccion) {
      await this.presentToast('Por favor completa todos los campos');
      return;
    }

    const nueva = {
      id: uuidv4(),
      nombre: this.nuevaAsignatura.nombre,
      seccion: this.nuevaAsignatura.seccion,
    };

    this.asignaturas.push(nueva);
    this.nuevaAsignatura = { nombre: '', seccion: '' }; // Limpiar campos

    await this.presentToast('Asignatura registrada exitosamente.');
  }

  // Generar QR para una asignatura
  generarQRAsignatura(asignatura: { id: string; nombre: string; seccion: string }) {
    this.qrData = JSON.stringify({
      id: asignatura.id,
      nombre: asignatura.nombre,
      seccion: asignatura.seccion,
    });
  }

  // Eliminar asignatura
  async eliminarAsignatura(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar esta asignatura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.asignaturas = this.asignaturas.filter(a => a.id !== id);
            this.presentToast('Asignatura eliminada exitosamente.');
          },
        },
      ],
    });

    await alert.present();
  }

  // Cerrar sesión
  async logOut() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.navCtrl.navigateRoot('/home');
          },
        },
      ],
    });

    await alert.present();
  }

  // Mostrar notificaciones
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
}
