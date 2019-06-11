import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(public http: HttpClient) { }

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
    return this.http.post(url, { token });
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

    // ejecuta el observable
    return this.http.post(url, usuario).pipe(
      map((response: any) => {

        // almacena la informacion en el localstorage (Solo almacena string)
       /* localStorage.setItem('id', response.id);
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));*/

        return true;
      })
    );
  }

  // guarda el usuario en el storage
  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // asigna los valores
    this.usuario = usuario;
    this.token = token;
  }
}
