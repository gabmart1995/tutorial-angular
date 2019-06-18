import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    // retorna una promesa
    return new Promise((resolve, reject) => {

      // creacion del FromData de Ajax
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('img', archivo, archivo.name);

      // onreadystatechage notifica al usuario de cualquier cambio
      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log( 'Imagen subida' );

            // manda la respuesta del la peticion http
            resolve(JSON.parse(xhr.response));
          }

          else {
            console.log( 'Fallo la subida del archivo' );
            reject(JSON.parse(xhr.response));
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      // realiza la peticion http
      xhr.open('PATCH' , url, true);
      xhr.send(formData);

    });
  }
}
