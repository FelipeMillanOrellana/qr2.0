import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfesorPageRoutingModule } from './profesor-routing.module';
import { ProfesorPage } from './profesor.page';
import { QRCodeModule } from 'angularx-qrcode'; // Importar QRCodeModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorPageRoutingModule,
    QRCodeModule // Agregar aquí
  ],
  declarations: [ProfesorPage],
})
export class ProfesorPageModule {}
