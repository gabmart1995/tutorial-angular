import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = '';

  constructor() {
    console.log( 'Modal upload listo' );
   }
}
