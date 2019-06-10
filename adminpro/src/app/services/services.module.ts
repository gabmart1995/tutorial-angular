import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService
  ]
})
export class ServicesModule { }
