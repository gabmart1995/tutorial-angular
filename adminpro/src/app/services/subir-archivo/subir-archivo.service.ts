import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    
    // creacion del FromData de Ajax
    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    // formData.append();  3:43  video 173

  }
}
