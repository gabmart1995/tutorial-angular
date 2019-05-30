import { NgModule } from '@angular/core';

// modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';  // ng2-charts
// rutas
import { PAGES_ROUTES } from './pages.routes';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component'; // temporal
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';


@NgModule({
    declarations : [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficaDonaComponent
    ],

    // aqui se exportan los modulos de la aplicacion.
    exports : [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],

    imports : [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }