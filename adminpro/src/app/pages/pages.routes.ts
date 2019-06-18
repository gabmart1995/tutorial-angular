import { RouterModule, Routes } from '@angular/router';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/services.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes = [{
    path : '',
    canActivate: [LoginGuardGuard],  // aqui se invocan los guards
    component : PagesComponent,
    children : [
        { path : 'dashboard', component : DashboardComponent, data: { titulo : 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { titulo : 'Progress' } },
        { path: 'graficas1', component: Graficas1Component, data: { titulo : 'Graficas' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo : 'Personalizacion' } },
        { path: 'promesas', component: PromesasComponent, data: { titulo : 'Promesas' } }, // promesas
        { path: 'rxjs', component: RxjsComponent, data: { titulo : 'Observables' } },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // cuando no existe ninguna ruta va a redireccionar.

        // mantenimiento
        { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } }
    ]
}];

// en este caso son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
