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
  usuario: string = '';
  from: string = ''; // Para rastrear de dónde viene la navegación
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener parámetros de navegación
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || ''; // De dónde viene la navegación
      this.usuario = params['usuario'] || 'Invitado'; // Si existe usuario, lo asigna
    });

    // Habilitar el menú lateral
    this.menu.enable(true, 'first');
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'first');
  }

  async onSubmit() {
    console.log('Formulario enviado', this.contact);

    const alert = await this.alertController.create({
      header: 'Enviado',
      message: '¡Gracias por tus sugerencias!',
      buttons: ['OK'],
    });
    await alert.present();

    this.contact.email = '';
    this.contact.message = '';
  }

  // Regresar a la página previa
  goBack() {
    if (this.from === 'profesor') {
      this.router.navigate(['/profesor']);
    } else if (this.from === 'dashboard') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']); // Navegación predeterminada si no hay contexto
    }
  }
}
