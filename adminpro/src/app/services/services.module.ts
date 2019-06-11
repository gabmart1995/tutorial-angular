import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


// se importan todos los servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService
 } from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService
  ]
})
export class ServicesModule { }
