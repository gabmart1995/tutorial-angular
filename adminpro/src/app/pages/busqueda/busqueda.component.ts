import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.models';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  // arreglos de busquedas
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor(
    public _activatedRoute: ActivatedRoute,
    public _http: HttpClient
  ) {

    _activatedRoute.params
      .subscribe( params => {

        let termino = params['termino'];
        this.buscar( termino );
       
      });

   }

  ngOnInit() {
  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this._http.get( url )
      .subscribe( ( response: any ) => {
        
        this.hospitales = response.hospitales;
        this.medicos = response.medicos;
        this.usuarios = response.usuarios;

      });
  }

}
