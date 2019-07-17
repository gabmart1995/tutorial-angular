import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarMedicos() {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get( url ).pipe(
      map( (response: any ) => {

        this.totalMedicos = response.totalRegistros;
        return response.medicos;
      })
    );
  }
}
