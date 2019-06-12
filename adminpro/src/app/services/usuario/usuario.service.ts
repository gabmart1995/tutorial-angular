import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from './../../config/config';

import { Usuario } from './../../models/usuario.models';

import { map } from 'rxjs/operators';  // importacion correcta del archivo



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // variables que me indican si esta logueado
  usuario: Usuario;
  token: string;

  constructor(
      public http: HttpClient,
      public router: Router
    ) {

    // carga los datos dentro del navegador
    this.cargarStorage();
   }

  // identifica si el usuario esta logueado
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  // carga el localStorage y lo asigna a la variable
  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    else {
      this.token = '';
      this.usuario = null;
    }
  }

  // guarda el usuario en el storage recibe 3 parametros
  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // asigna los valores dentro de los valores
    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {

    // se construye la peticion url al servidor
    let url = URL_SERVICIOS + '/usuario';

    // retorna un observador con las respuestas
    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return response.usuario;
      })
    );
  }

  loginGoogle(token: string) {

    // genera la URL y se conecta con el Backend
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((response: any) => {

        // llama a la fuucion gaurdar storage
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {

    // si recuerdame es true almacena en el localStorage
    if (recordar)  {
      localStorage.setItem('email', usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }

    // define la URL
    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((response: any) => {

        // ejecuta la funcion y guarda en el localStorage
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  // salida del usuario
  logout() {

    // vacia las variables
    this.usuario = null;
    this.token = '';

    // remueve los elementos por el usuario
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // redirecciona al login
    this.router.navigate(['/login']);
  }
}
