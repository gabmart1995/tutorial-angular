import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    // el observador es infinito
    let obs = new Observable( observer => {

      let contador = 0;
      let intervalo = setInterval(() => {

        contador += 1;

        // le pasa los datos a obs y lo ejecuta
        observer.next( contador );

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (contador === 2) {
          observer.error();
        }

      }, 1000);

    });

    // cuando el observador haya alcanzado el objetivo ejecutara esta funcion
    // recibe 3 parametros

    obs.subscribe(
      numero =>  console.log('Subs', numero),  // next cuando yo recibo informacion
      error => console.error('Error en el obs', error), // error muestra los errores
      () => console.log('El observador termino') // complete cuando completa su tarea
    );

   }

  ngOnInit() {
  }

}
