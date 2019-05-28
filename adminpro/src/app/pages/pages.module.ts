import { NgModule } from '@angular/core';

// modulos
import { SharedModule } from '../shared/shared.module';

// rutas
import { PAGES_ROUTES } from './pages.routes';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


@NgModule({
    declarations : [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],

    // aqui se exportan los modulos de la aplicacion.
    exports : [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],

    imports : [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }