import { Component, OnInit } from '@angular/core';
import {
  SubirArchivoService,
  ModalUploadService
} from '../../services/services.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: any;  // imagen temporal

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
   }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp =  reader.readAsDataURL(archivo);

    // muestra el resulatdo de la URL temporal
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  subirImagen() {

    this._subirArchivoService.subirArchivo( 
      this.imagenSubir,
      this._modalUploadService.tipo,
      this._modalUploadService.id
       )
       .then( response => {
          this._modalUploadService.notificacion.emit( response );
          this.cerrarModal();
       })
       .catch( error => {
         console.log('Error en la carga ...');
       });
  }

}
