import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MenuController,
  LoadingController,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  usuario: string | null = null;
  html5QrCode: Html5Qrcode | null = null;
  isScanning: boolean = false;
  latitud: number | null = null;
  longitud: number | null = null;
  scannedStudents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private menu: MenuController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.usuario = params['usuario'] || 'Invitado';
    });

    this.menu.enable(true, 'first');
    this.html5QrCode = new Html5Qrcode('reader');
    this.obtenerCoordenadas();
    this.loadScannedStudents();
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Cerrar sesión', handler: () => this.navCtrl.navigateRoot('/home') },
      ],
    });
    await alert.present();
  }

  goToContacto() {
    this.navCtrl.navigateForward(['/contacto'], {
      queryParams: { from: 'dashboard', usuario: this.usuario },
    });
  }

  async startAttendance() {
    if (this.isScanning || !this.html5QrCode) return;
    this.isScanning = true;

    const loading = await this.loadingController.create({
      message: 'Iniciando escaneo...',
    });
    await loading.present();

    const config = { fps: 10, qrbox: 250 };

    try {
      await this.html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => this.handleScanSuccess(decodedText),
        (errorMessage) => this.handleScanError(errorMessage)
      );
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Inténtalo de nuevo.';
      await this.presentAlert('Error al iniciar el escáner', error);
    } finally {
      await loading.dismiss();
    }
  }

  async handleScanSuccess(decodedText: string) {
    const studentData = {
      codigo: decodedText,
      fecha: new Date().toISOString(),
      coordenadas: { latitud: this.latitud, longitud: this.longitud },
    };

    if (!this.scannedStudents.some((s) => s.codigo === decodedText)) {
      this.scannedStudents.push(studentData);
      this.saveToLocalStorage('scannedStudents', this.scannedStudents);
      await this.presentToast('Asistencia registrada exitosamente.');
    } else {
      await this.presentToast('Este estudiante ya ha registrado asistencia.');
    }

    this.stopScanning();
  }

  handleScanError(errorMessage: string) {
    console.log(`Error en el escaneo: ${errorMessage}`);
    this.presentToast('No se pudo leer el código QR. Intenta de nuevo.');
  }

  async stopScanning() {
    if (this.html5QrCode && this.isScanning) {
      await this.html5QrCode.stop();
      this.isScanning = false;
    }
  }

  loadScannedStudents() {
    const data = localStorage.getItem('scannedStudents');
    this.scannedStudents = data ? JSON.parse(data) : [];
  }

  saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async obtenerCoordenadas() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo ubicación...',
    });
    await loading.present();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
          loading.dismiss();
        },
        async () => {
          await this.presentToast('Error al obtener ubicación.');
          loading.dismiss();
        }
      );
    } else {
      await this.presentToast('Tu navegador no soporta geolocalización.');
      loading.dismiss();
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 3000, position: 'bottom' });
    await toast.present();
  }

  ngOnDestroy() {
    this.stopScanning();
  }
}
