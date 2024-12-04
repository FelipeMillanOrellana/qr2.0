import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarsePage } from './registrarse.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarsePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarsePageRoutingModule {}
