import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  usuario: string = "";
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router // Inyecta el Router para navegación
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario = params['usuario'] ? params['usuario'] : 'Invitado';
    });

    this.menu.enable(true, 'first');
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }

  async onSubmit() {
    console.log('Formulario enviado', this.contact);

    // Muestra un mensaje de confirmación
    const alert = await this.alertController.create({
      header: 'Enviado',
      message: '¡Gracias por tus sugerencias!',
      buttons: ['OK'],
    });
    await alert.present();

    // Limpiar los campos después de enviar
    this.contact.email = '';
    this.contact.message = '';
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
