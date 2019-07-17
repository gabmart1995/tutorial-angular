import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagenes';

    if (!img) {
      // trae la imagen por defecto
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    // pregunta por el tipo de imagen
    switch (tipo) {
      
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen no existe, usuarios, medicos y hospitales');
        url += '/usuarios/xxx';
    }

    // retorna la variable
    return url;
  }

}
