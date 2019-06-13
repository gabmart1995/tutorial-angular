import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario

  constructor(
    public _usuarioServices: UsuarioService
  ) {

    // construye la vista con los datos del usuario
    this.usuario = this._usuarioServices.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;  //6:54
  }

}
