import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  constructor( @Inject(DOCUMENT) private _document ) {
    // carga los ajustes cuando carga la pagina
    this.cargarAjustes();
  }

  // variable JSON que almacena los ajustes
  ajustes: Ajustes = {
    temaUrl: './assets/css/colors/default.css',
    tema: 'default' // tema por defecto
  };

  // guarda lo almacenado en la variable en un string de JSON
  guardarAjustes() {
    console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {

    // pregunta al localStore si existen los ajustes
    if (localStorage.getItem('ajustes')) {

      // aplica un set a las variables y transforma los datos a string
      // de JSON a JavaScript
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargando del localStorage');

      this.aplicarTema(this.ajustes.tema);
    }

    else {
      console.log('usando los valores por defecto');

      //carga los ajustes por defecto
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {

    // sobreescribe la url de la etiqueta link del css de la pagina
    let url = `./assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    // guarda los ajustes
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

// interface que  permite controlar los servicios
interface Ajustes {
  temaUrl: string;
  tema: string;
}
