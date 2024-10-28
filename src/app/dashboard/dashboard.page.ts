import { Component, OnInit, OnDestroy } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  usuario: string = '';
  html5QrCode: Html5Qrcode | null = null;
  isScanning: boolean = false;
  latitud: number | null = null;  // Variable para latitud
  longitud: number | null = null;  // Variable para longitud

  constructor(
    private route: ActivatedRoute,
    private menu: MenuController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario = params['usuario'] || 'Invitado';
    });
    this.menu.enable(true, 'first');
    this.html5QrCode = new Html5Qrcode("reader");
    
    this.obtenerCoordenadas(); // Llamar al método para obtener coordenadas
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }

  goToContacto() {
    this.navCtrl.navigateForward(['/contacto', { usuario: this.usuario }]);
  }

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

  handleScanSuccess(decodedText: string) {
    console.log(`Código QR detectado: ${decodedText}`);

    // Verificar si el contenido escaneado es una URL válida
    if (this.isValidUrl(decodedText)) {
      // Redirigir a la URL escaneada
      window.location.href = decodedText;
    } else {
      console.log("El código escaneado no es una URL válida.");
    }

    this.stopScanning();
  }

  handleScanError(errorMessage: string) {
    console.log(`Error en el escaneo: ${errorMessage}`);
  }

  async stopScanning() {
    if (this.html5QrCode && this.isScanning) {
      await this.html5QrCode.stop().catch(err => console.error(`Error al detener el escáner: ${err}`));
      this.isScanning = false;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  async obtenerCoordenadas() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
        },
        (error) => {
          console.error("Error al obtener la geolocalización: ", error);
        }
      );
    } else {
      console.log("Geolocalización no es soportada por este navegador.");
    }
  }

  ngOnDestroy() {
    this.stopScanning();
  }
}
