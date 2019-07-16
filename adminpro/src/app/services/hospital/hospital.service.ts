import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from './../../config/config';
import { Hospital } from '../../models/hospital.models';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService,
    public _router: Router,
  ) { }

  obtenerTokenUsuario() {
    this.token = localStorage.getItem( 'token' );
  }

  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospital/?desde=' + desde;

    // retorna los datos
    return this.http.get( url );
  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url ).pipe(
      map( (response: any) => response.hospital )
    );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.delete( url ).pipe(
      map( ( response: any) =>  response.hospital )
    );
  }

  crearHospital( hospital: Hospital ) {

    let url =  URL_SERVICIOS + '/hospital/?token=' + this.token;

    return this.http.post( url, hospital ).pipe(
        map( (response: any) => {

          swal('Hospital Creado', hospital.nombre, 'success');
          return response.hospital;

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
    url += '?token=' + this.token;

    return this.http.patch( url, hospital )
      .pipe( map( (response: any) => {

          swal('hospital actualizado', hospital.nombre, 'success');
          return true;

      }) );
  }

  
}
