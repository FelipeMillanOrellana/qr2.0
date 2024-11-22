import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
=======
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
=======
    HomePageRoutingModule
  ],
  declarations: [HomePage]
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
})
export class HomePageModule {}
