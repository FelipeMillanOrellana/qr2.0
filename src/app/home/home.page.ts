import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  goToDashboard() {
    if (this.usuario === 'fe.millan@duocuc.cl' && this.password === 'M20647283-9') {
      this.navCtrl.navigateForward(['/dashboard', { usuario: this.usuario }]);
    } else {
      this.presentToast('Usuario o contraseña incorrectos');
    }
  }
}
