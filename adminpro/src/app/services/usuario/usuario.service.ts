import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';

import { Usuario } from './../../models/usuario.models';

import { map } from 'rxjs/operators';  // importacion correcta del archivo

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) { }

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

  login( usuario: Usuario, recordar: boolean = false) {

    // define la URL
    let url = URL_SERVICIOS + '/login';

    // ejecuta el observable
    return this.http.post(url, usuario);
  }
}
