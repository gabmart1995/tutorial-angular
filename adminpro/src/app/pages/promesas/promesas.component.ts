import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})

export class PromesasComponent implements OnInit {

  constructor() {

    // comprueba la promesa
    this.contarTres().then(
      () => console.log('Termino!')
      ).catch( error => console.error('Error en la promesa', + error));
   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let contador = 0;
      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador === 3) {
            resolve(); // cumple la promesa y termina el intervalo
            clearInterval(intervalo);
          }

        }, 1000);
      }); // se declara una promesa.
  }
}
