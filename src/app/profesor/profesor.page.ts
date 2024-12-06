import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, ToastController, NavController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

interface Asignatura {
  id: string;
  nombre: string;
  seccion: string;
  year?: number;
  semester?: number;
  campus?: string;
  code?: string;
  profesorId?: string;
  modality?: string;
}

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage {
  usuario: string = 'Profesor';
  nuevaAsignatura: Asignatura = {
    id: '',
    nombre: '',
    seccion: '',
    year: undefined,
    semester: undefined,
    campus: '',
    code: '',
    profesorId: '',
    modality: '',
  };
  asignaturas: Asignatura[] = [];
  qrData: string | null = null;
  isQRCodeVisible: boolean = false;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cargarAsignaturas();
  }

  guardarAsignaturas() {
    localStorage.setItem('asignaturas', JSON.stringify(this.asignaturas));
  }

  cargarAsignaturas() {
    const storedAsignaturas = localStorage.getItem('asignaturas');
    if (storedAsignaturas) {
      this.asignaturas = JSON.parse(storedAsignaturas);
    }
  }

  registrarAsignatura() {
    const { nombre, seccion, year, semester, campus, code, profesorId, modality } = this.nuevaAsignatura;

    if (
      nombre.trim() &&
      seccion.trim() &&
      year &&
      semester &&
      campus?.trim() &&
      code?.trim() &&
      profesorId?.trim() &&
      modality?.trim()
    ) {
      const asignatura: Asignatura = {
        ...this.nuevaAsignatura,
        id: uuidv4(),
      };

      this.asignaturas.push(asignatura);
      this.guardarAsignaturas();

      this.nuevaAsignatura = {
        id: '',
        nombre: '',
        seccion: '',
        year: undefined,
        semester: undefined,
        campus: '',
        code: '',
        profesorId: '',
        modality: '',
      };

      this.presentToast('Asignatura registrada con éxito.');
    } else {
      this.presentToast('Por favor, completa todos los campos de la asignatura.');
    }
  }

  generarQRAsignatura(asignatura: Asignatura) {
    this.qrData = JSON.stringify(asignatura);
    this.isQRCodeVisible = true;
  }

  hideQRCode() {
    this.isQRCodeVisible = false; // Cambiar el estado del QR a no visible
    this.qrData = null; // Opcional: Limpia los datos del QR generado
  }
  

  eliminarAsignatura(id: string) {
    this.asignaturas = this.asignaturas.filter((asignatura) => asignatura.id !== id);
    this.guardarAsignaturas();
    this.presentToast('Asignatura eliminada con éxito.');
  }

  goToContacto() {
    this.router.navigate(['/contacto'], {
      queryParams: { from: 'profesor', usuario: this.usuario },
    });
  }

  goToListaAlumnos() {
    this.router.navigate(['/lista-alumnos'], {
      queryParams: { from: 'profesor', usuario: this.usuario },
    });
  }

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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
}
