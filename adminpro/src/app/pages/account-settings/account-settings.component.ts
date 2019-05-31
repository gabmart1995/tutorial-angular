import { Component,  OnInit } from '@angular/core';

// services
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})

export class AccountSettingsComponent implements OnInit {

  // se necesita una referencia de todo el DOM en si.
  constructor( public _ajustes: SettingsService) {}

  ngOnInit() {

    // ejecuta la funcion cuando carga la pagina
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any) {

    let selectores: any = document.getElementsByClassName('selector');

    // realiza una revision de cada uno de las etiquetas,
    // si la consigue retira esa clase del elemento HTML

    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    // añade la clase al link seleccionado
    link.classList.add('working');
  }

  colocarCheck() {

    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    // Barre todos los elementos y compara los elementos (JavaScript)
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');   // asigna la clase al selector y rompe el bucle
        break;
      }
    }
  }

}
