/*
    Implementacion de las rutas de la aplicacion (forma manual)

    Se crea el modulo de rutas y se importa los metodos de Routes de angular
    Se declara una constante que va a alojar todas de las rutas de la aplicacion en formato JSON.
*/

import { RouterModule, Routes } from '@angular/router';

// componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// rutas
const appRoutes: Routes = [
    { path : 'dashboard', component : DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: LoginComponent }, // register (CORREGIR)
    { path: 'progress', component: ProgressComponent },
    { path: 'graficas1', component: Graficas1Component },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // este elemento redirecciona a cualquier URL que este en blanco
    { path: '**', component: NopagefoundComponent } // esta ruta se ejecuta si el usuario ingresa una URL invalida.
];

// exporta el modulo completo a la raiz de angular guardando la clave hash.
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash : true });

