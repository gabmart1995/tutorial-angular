import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/services.index';

declare var swal: any;

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

  cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((response: any) => {

        // envia el total de usuarios y el arreglo de los usuarios
        this.totalUsuarios = response.totalRegistros;
        this.usuarios = response.usuarios;
        this.cargando = false;

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

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {

    // el usaurio no puede eliminarse
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal( 'No puede borrar usuario', 'No se puede borrar a si mismo', 'error' );
      return;
    }

    // mensaje de confirmacion
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a' +  usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log(borrar);

      if ( borrar ) {
        this._usuarioService.borrarUsuario( usuario._id )
          .subscribe( (response: boolean) => {
            console.log( response );
            this.cargarUsuarios();
          });
      }
    });
  }

    guardarUsuario( usuario: Usuario ) {
      this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }
}
