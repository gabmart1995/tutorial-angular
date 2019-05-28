import { RouterModule, Routes } from '@angular/router';

// componentes
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

// rutas
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent } // esta ruta se ejecuta si el usuario ingresa una URL invalida.
];

// exporta el modulo completo a la raiz de angular guardando la clave hash.
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash : true });

