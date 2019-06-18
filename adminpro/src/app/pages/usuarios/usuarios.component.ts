import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  // variable que indica la paginacion
  desde: number = 0;
  totalUsuarios: number = 0;

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((response: any) => {
        console.log(response);

        // envia el total de usuarios
        this.totalUsuarios = response.totalRegistros;
      });
  }

}
