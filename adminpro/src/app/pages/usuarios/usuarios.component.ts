import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  // variables que indican la paginacion
  desde: number = 0;
  totalUsuarios: number = 0;

  //cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((response: any) => {

        // envia el total de usuarios y el arreglo de los usuarios
        this.totalUsuarios = response.totalRegistros;
        this.usuarios = response.usuarios;
      });
  }

  cambiarDesde(valor: number) {

      // toma el valor actual y lo suma
      let desde = this.desde + valor;

      console.log(desde);

      // validacion del total de usuarios
      if (desde >= this.totalUsuarios) {
        return;
      }

      if (desde < 0) {
        return;
      }

      // incrementa el valor de la consulta y ejecuta el metodo
      this.desde += valor;
      this.cargarUsuarios();
  }
}
