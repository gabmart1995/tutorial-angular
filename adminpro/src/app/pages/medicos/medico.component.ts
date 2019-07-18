import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.models';
import { MedicoService, HospitalService, ModalUploadService } from '../../services/services.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', '', '', '');  // se inicializa un nuevo usuario vacio

  hospital: Hospital = new Hospital('');

  constructor(
   public _medicoService: MedicoService,
   public  _hospitalService: HospitalService,
   public _router: Router,
   public _activateRoute: ActivatedRoute,
   public _modalUploadService: ModalUploadService
  ) {

    _activateRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }

    });

   }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
      .subscribe( response => {

        this.medico.img = response.medico.img;   // actualiza la imagen y recarga la pagina

      });

  }

  guardarMedico( formulario: NgForm ) {

    if ( formulario.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
      .subscribe( medico => {

        this.medico._id = medico._id;
        this._router.navigate([ '/medico', medico._id ]);

      });

  }

  cambioHospital( id: string ) {

    this._hospitalService.obtenerHospital( id )
      .subscribe( hospital => this.hospital = hospital );

  }

  cargarMedico( id: string ) {  // metodo que realiza la carga de los datos de los usuarios

    this._medicoService.cargarMedico( id )
      .subscribe( medico => {

        this.medico = medico;  // carga el nombre
        this.medico.hospital = medico.hospital._id;  // asigna el hospital
        this.cambioHospital( this.medico.hospital ); // asigna la imagen

      } );
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }

}
