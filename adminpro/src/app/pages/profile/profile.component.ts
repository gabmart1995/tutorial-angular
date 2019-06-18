import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: any;  // imagen temporal

  constructor(
    public _usuarioServices: UsuarioService
  ) {

    // construye la vista con los datos del usuario
    this.usuario = _usuarioServices.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    // si el usuario no es de google permite actualizar el email.
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    // llama al servicio
    this._usuarioServices.actualizarUsuario(this.usuario)
      .subscribe();
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp =  reader.readAsDataURL(archivo);

    // muestra el resulatdo de la URL temporal
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
