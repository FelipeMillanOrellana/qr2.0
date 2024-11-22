import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
<<<<<<< HEAD
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
=======
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recuperar',
<<<<<<< HEAD
    loadChildren: () =>
      import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
  },
  {
    path: 'profesor',
    loadChildren: () =>
      import('./profesor/profesor.module').then(m => m.ProfesorPageModule),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./contacto/contacto.module').then(m => m.ContactoPageModule),
  },
  {
    path: 'registrarse',
    loadChildren: () =>
      import('./registrarse/registrarse.module').then(m => m.RegistrarsePageModule),
  },
  {
    path: 'lista-alumnos',
    loadChildren: () => import('./models/lista-alumnos/lista-alumnos.module').then( m => m.ListaAlumnosPageModule)
=======
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorPageModule),
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoPageModule),
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
