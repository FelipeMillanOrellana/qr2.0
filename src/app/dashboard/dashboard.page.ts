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
<<<<<<< HEAD
  scannedStudents: any[] = []; // Lista de estudiantes que han escaneado el QR
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3

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

<<<<<<< HEAD
=======
  

>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
    this.menu.enable(true, 'first');

    if (!this.html5QrCode) {
      this.html5QrCode = new Html5Qrcode("reader");
    }

    this.obtenerCoordenadas();
<<<<<<< HEAD
    this.loadScannedStudents(); // Cargar estudiantes almacenados en localStorage
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }

<<<<<<< HEAD
  // Confirmación para cerrar sesión
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
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

<<<<<<< HEAD
  // Ir a la página de contacto
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  goToContacto() {
    this.navCtrl.navigateForward(['/contacto'], {
      queryParams: { from: 'dashboard', usuario: this.usuario },
    });
  }

<<<<<<< HEAD
  // Iniciar escaneo del QR
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
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

<<<<<<< HEAD
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
=======
  async handleScanSuccess(decodedText: string) {
    console.log(`Código QR detectado: ${decodedText}`);

    if (this.isValidUrl(decodedText)) {
      const alert = await this.alertController.create({
        header: 'Redirección',
        message: `¿Deseas abrir esta URL? <br><strong>${decodedText}</strong>`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Abrir',
            handler: () => {
              window.location.href = decodedText;
            },
          },
        ],
      });
      await alert.present();
    } else {
      await this.presentToast("El código escaneado no es una URL válida.");
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
    }

    this.stopScanning();
  }

  handleScanError(errorMessage: string) {
    console.log(`Error en el escaneo: ${errorMessage}`);
  }

<<<<<<< HEAD
  // Detener escaneo
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
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

<<<<<<< HEAD
  // Cargar lista de estudiantes desde el localStorage
  loadScannedStudents() {
    const storedData = localStorage.getItem('scannedStudents');
    this.scannedStudents = storedData ? JSON.parse(storedData) : [];
  }

  // Mostrar alerta
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

<<<<<<< HEAD
  // Mostrar notificación
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

<<<<<<< HEAD
  // Obtener coordenadas
=======
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
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
<<<<<<< HEAD
          await this.presentToast("Error al obtener ubicación.");
=======
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("Permiso de geolocalización denegado.");
              await this.presentToast("Permiso de geolocalización denegado.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("La posición no está disponible.");
              await this.presentToast("No se pudo obtener la ubicación.");
              break;
            case error.TIMEOUT:
              console.error("El tiempo de espera para obtener la posición se agotó.");
              await this.presentToast("Tiempo de espera agotado al obtener ubicación.");
              break;
            default:
              console.error("Error desconocido al obtener geolocalización.");
              await this.presentToast("Error desconocido al obtener ubicación.");
              break;
          }
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
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
