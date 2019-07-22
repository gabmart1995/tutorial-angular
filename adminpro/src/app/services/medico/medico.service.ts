import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    private _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number ) {

    let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get( url ).pipe(
      map( (response: any ) => {

        this.totalMedicos = response.totalRegistros;
        return response.medicos;
      })
    );
  }

  buscarMedicos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url ).pipe(
      map( ( response: any )  => response.medicos )
    );
  }

  borrarMedicos( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url ).pipe(
      map(  response => {
        swal( 'Medico Borrado', 'Medico Borrado Correctamente', 'success' );
        return response;
      }),

      catchError( error => {
        swal( error.error.mensaje, error.error.errors.message, 'error' );
        return throwError( error );
      })
    );

  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {

      // actualizando medico
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.patch( url, medico ).pipe(
       
        map( (response: any ) => {
          swal( 'Medico actualizado', medico.nombre, 'success' );
          return response.medico;
        }),

        catchError( error => {
          swal( error.error.mensaje, error.error.errors.message, 'error' );
          return throwError( error );
        })
        
      );

    }

    else {

      // creando medico
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico ).pipe(
        map( (response: any ) => {
          swal( 'Medico Creado', medico.nombre, 'success' );
          return response.medico;
        }),

        catchError( error => {
          swal( error.error.mensaje, error.error.errors.message, 'error' );
          return throwError( error );
        })

      );
    }


  }

  cargarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url ).pipe(
      map( ( response: any ) => response.medico )
    );
  }
}
