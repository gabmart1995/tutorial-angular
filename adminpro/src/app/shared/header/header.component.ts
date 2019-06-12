import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/services.index';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
