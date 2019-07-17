import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.models';
import {
  HospitalService,
  ModalUploadService
} from '../../services/services.index';

declare var swal: any;  // incluye esta linea para dar funcionalidad al elemento Sweetalert

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;


  cargando: boolean = true;

  constructor(
    private _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe( (hospitales: any) => {

          this.hospitales = hospitales;
          this.cargando = false;

      });
  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0  ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
      .subscribe(  hospitales  => this.hospitales = hospitales );
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this._hospitalService.totalHospitales ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    // incrementa el valor de la consulta y ejecuta el metodo
    this.desde += valor;
    this.cargarHospitales();

  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    this._hospitalService.borrarHospital( hospital._id )
      .subscribe( () => this.cargarHospitales()  );

  }
  crearHospital() {

    // SweetAlert Input
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
    })
    .then( ( valor: string )  => {

      if ( !valor || valor.length <= 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
        .subscribe( () => this.cargarHospitales() );

    });
  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }
}
