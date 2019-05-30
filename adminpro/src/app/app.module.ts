import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modulos personalizados
import { PagesModule } from './pages/pages.module';

// temporal
import { FormsModule } from '@angular/forms';

// rutas
import { APP_ROUTES } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],

  // aqui se incluyen los modulos personalizados
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    PagesModule,
    FormsModule  // temporal
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
