import { RouterModule, Routes } from '@angular/router';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard, AdminGuard } from '../services/services.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [{
    path : '',
    canActivate: [ LoginGuardGuard ],  // aqui se invocan los guards
    component : PagesComponent,
    children : [
        { path : 'dashboard', component : DashboardComponent, data: { titulo : 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { titulo : 'Progress' } },
        { path: 'graficas1', component: Graficas1Component, data: { titulo : 'Graficas' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo : 'Personalizacion' } },
        { path: 'promesas', component: PromesasComponent, data: { titulo : 'Promesas' } }, // promesas
        { path: 'rxjs', component: RxjsComponent, data: { titulo : 'Observables' } },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }  },

        // mantenimiento
        {
            path: 'usuarios', 
            component: UsuariosComponent,
            canActivate: [ AdminGuard ],
            data: { titulo: 'Mantenimiento de usuarios' } 
        },


        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },

        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // cuando no existe ninguna ruta va a redireccionar a esta.

    ]
}];

// en este caso son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
