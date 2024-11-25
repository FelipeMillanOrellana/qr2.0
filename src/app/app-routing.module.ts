import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recuperar',
    loadChildren: () =>
      import('./recuperar/recuperar.module').then((m) => m.RecuperarPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'profesor',
    loadChildren: () =>
      import('./profesor/profesor.module').then((m) => m.ProfesorPageModule),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./contacto/contacto.module').then((m) => m.ContactoPageModule),
  },
  {
    path: 'registrarse',
    loadChildren: () =>
      import('./registrarse/registrarse.module').then(
        (m) => m.RegistrarsePageModule
      ),
  },
  {
    path: 'lista-alumnos',
    loadChildren: () =>
      import('./models/lista-alumnos/lista-alumnos.module').then(
        (m) => m.ListaAlumnosPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
