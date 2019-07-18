import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SettingsService,
  SubirArchivoService,
  SidebarService,
  SharedService,
  ModalUploadService,
  UsuarioService,
  HospitalService,
  MedicoService,
  LoginGuardGuard,
  AdminGuard
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
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    LoginGuardGuard
  ]
})
export class ServicesModule { }
