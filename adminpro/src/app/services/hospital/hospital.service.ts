import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { URL_SERVICIOS } from './../../config/config';
import { Hospital } from '../../models/hospital.models';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService,
    public _router: Router,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospital/?desde=' + desde;

    // retorna los datos
    return this.http.get( url ).pipe(
      map( ( response: any ) => {

        this.totalHospitales = response.totalRegistros;
        return response.hospitales;

      })
    );
  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url ).pipe(
      map( (response: any) => response.hospital )
    );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url ).pipe(
      map( ( response ) => swal('Hospital borrado', 'eliminado correctamente', 'success' ) ),
      
      catchError( error => {
        swal( error.error.mensaje, error.error.errors.message, 'error' );
        return throwError( error );
      })
    );
  }

  crearHospital( nombre: string ) {

    let url =  URL_SERVICIOS + '/hospital/?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } ).pipe(
       map( ( response: any ) =>  response.hospital ),

       catchError( error => {
        swal( error.error.mensaje, error.error.errors.message, 'error' );
        return throwError( error );
      })
    );
  }

  buscarHospital( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url ).pipe(
      map( (response: any) => response.hospitales )
    );
  }

  actualizarHospital( hospital: Hospital )  {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.patch( url, hospital ).pipe( 
      map( (response: any) => {
        swal( 'Hospital Actualizado', hospital.nombre, 'success' );
        return response.hospital;
      }),

      catchError( error => {
        swal( error.error.mensaje, error.error.errors.message, 'error' );
        return throwError( error );
      })
    );
  }


}
