import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// modulos personalizados
import { PagesModule } from './pages/pages.module';

// temporal
import { FormsModule } from '@angular/forms';

// rutas
import { APP_ROUTES } from './app.routes';

// services
import { SettingsService } from './services/settings.service';

// componentes
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
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
