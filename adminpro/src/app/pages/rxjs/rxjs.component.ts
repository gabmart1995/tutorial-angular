import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';  // invoca el metodo map de los operadores

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  // variable que alamcena la suscripcion
  subscription: Subscription;

  constructor() {

    // crea el observable
      this.subscription = this.regresarObservable().subscribe(
      numero =>  console.log('Subs', numero),  // next
      error => console.error('Error en el obs', error), // error
      () => console.log('El observador termino') // complete
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {

    // se ejecuta esta funcion
    console.log('la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresarObservable(): Observable<any> {

    // logica del observable
     return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval(() => {

        contador += 1;

        // retorna el objeto
        const salida = {
          valor: contador
        };

        // le pasa los datos a obs y lo ejecuta
        observer.next( salida );

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

      }, 1000);

    }).pipe(

      // map transforma y devuelve el tipo de dato
      map( resp => resp.valor ),

      // filter filtra la salida de datos
      filter( (valor,  index) => {

        // el index corresponde al numero de veces que se ejecuta el filter
        if ((valor % 2) === 1) {
          return true;
        }

        else {
          return false;
        }
      })

      );

  }

}
