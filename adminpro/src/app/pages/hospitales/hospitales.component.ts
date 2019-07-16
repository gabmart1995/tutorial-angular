import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/services.index';
import { Hospital } from '../../models/hospital.models';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  desde: number = 0;
  totalHospitales: number;

  cargando: boolean = true;

  constructor(
    private _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this._hospitalService.obtenerTokenUsuario();
    this.cargarHospitales();
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe( (response: any) => {

          this.totalHospitales = response.totalRegistros;
          this.hospitales = response.hospitales;
          this.cargando = false;

      });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalHospitales ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    // incrementa el valor de la consulta y ejecuta el metodo
    this.desde += valor;
    this.cargarHospitales();

  }

  guardarHospital( hospital: Hospital, valor: string ) {

    hospital.nombre = valor; // asigna el valor del formulario al objeto

    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }

  borrarHospital( hospital: Hospital ) {

   /* swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a: ' + hospital.nombre,
      icon: 'Warning',
      dangerMode: true
    }).then( borrar => {

        console.log( borrar );

        if ( borrar ) {
          this._hospitalService.borrarHospital( hospital._id )
            .subscribe( (response: boolean) => {
              console.log( response );
              this.cargarHospitales();
            });
        }
      });*/
  }
}
