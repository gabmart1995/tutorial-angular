import { RouterModule, Routes } from '@angular/router';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

const pagesRoutes: Routes = [{
    path : '',
    component : PagesComponent,
    children : [
        { path : 'dashboard', component : DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graficas1', component: Graficas1Component },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // cuando no existe ninguna ruta va a redireccionar.
        { path: 'account-settings', component: AccoutSettingsComponent }
    ]
}];

// en este caso son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );