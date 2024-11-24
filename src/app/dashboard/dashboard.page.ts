import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
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
  scannedStudents: any[] = []; // Lista de estudiantes que han escaneado el QR

  constructor(
    private route: ActivatedRoute,
    private menu: MenuController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'] || 'Invitado';
    });

    this.menu.enable(true, 'first');

    if (!this.html5QrCode) {
      this.html5QrCode = new Html5Qrcode("reader");
    }

    this.obtenerCoordenadas();
    this.loadScannedStudents(); // Cargar estudiantes almacenados en localStorage
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }

  // Confirmación para cerrar sesión
  async confirmLogout() {
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

  // Ir a la página de contacto
  goToContacto() {
    this.navCtrl.navigateForward(['/contacto'], {
      queryParams: { from: 'dashboard', usuario: this.usuario },
    });
  }

  // Iniciar escaneo del QR
  async startAttendance() {
    if (this.isScanning || !this.html5QrCode) return;

    this.isScanning = true;

    const loading = await this.loadingController.create({
      message: 'Iniciando escaneo...',
    });
    await loading.present();

    const config = {
      fps: 10,
      qrbox: 250,
    };

    try {
      await this.html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText: string) => this.handleScanSuccess(decodedText),
        (errorMessage: string) => this.handleScanError(errorMessage)
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Inténtalo de nuevo.';
      console.error(`Error al iniciar el escáner: ${errorMessage}`);
      await this.presentAlert('Error al iniciar el escáner', errorMessage);
    } finally {
      await loading.dismiss();
    }
  }

  // Manejar el éxito del escaneo
  async handleScanSuccess(decodedText: string) {
    console.log(`Código QR detectado: ${decodedText}`);

    // Guardar datos del estudiante escaneado
    const studentData = {
      codigo: decodedText,
      fecha: new Date().toISOString(),
      coordenadas: {
        latitud: this.latitud,
        longitud: this.longitud,
      },
    };

    // Verificar si ya existe en la lista
    if (!this.scannedStudents.some(student => student.codigo === decodedText)) {
      this.scannedStudents.push(studentData);
      localStorage.setItem('scannedStudents', JSON.stringify(this.scannedStudents));
      await this.presentToast("Asistencia registrada exitosamente.");
    } else {
      await this.presentToast("Este estudiante ya ha registrado asistencia.");
    }

    this.stopScanning();
  }

  handleScanError(errorMessage: string) {
    console.log(`Error en el escaneo: ${errorMessage}`);
  }

  // Detener escaneo
  async stopScanning() {
    if (this.html5QrCode && this.isScanning) {
      try {
        await this.html5QrCode.stop();
        this.isScanning = false;
      } catch (err) {
        console.error(`Error al detener el escáner: ${err}`);
      }
    }
  }

  // Cargar lista de estudiantes desde el localStorage
  loadScannedStudents() {
    const storedData = localStorage.getItem('scannedStudents');
    this.scannedStudents = storedData ? JSON.parse(storedData) : [];
  }

  // Mostrar alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Mostrar notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Obtener coordenadas
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
        async (error) => {
          loading.dismiss();
          await this.presentToast("Error al obtener ubicación.");
        }
      );
    } else {
      await this.presentToast("Tu navegador no soporta geolocalización.");
      loading.dismiss();
    }
  }

  ngOnDestroy() {
    this.stopScanning();
  }
}
