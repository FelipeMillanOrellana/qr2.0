import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { IonicModule } from '@ionic/angular';

import { ProfesorPageRoutingModule } from './profesor-routing.module';
import { ProfesorPage } from './profesor.page';
import { QRCodeModule } from 'angularx-qrcode'; // Importar QRCodeModule
=======

import { IonicModule } from '@ionic/angular';

import { ProfesorPageRoutingModule } from './profesor-routing.module';

import { ProfesorPage } from './profesor.page';
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    ProfesorPageRoutingModule,
    QRCodeModule, // Agregar aquí
  ],
  declarations: [ProfesorPage],
=======
    ProfesorPageRoutingModule
  ],
  declarations: [ProfesorPage]
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
})
export class ProfesorPageModule {}
