import { Component, Input, Output, OnInit, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  /*
    ElementRef permite obtener todos los datos de nodo de
    HTML. ViewChild debe obtener un paramentro que corresponde al hash de la etiqueta.
  */

  @ViewChild('txtProgress') txtProgress: ElementRef;

  // Input: permite recibir cambios del componente dentro de la directiva como un atributo HTML.
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  /*
    Nota: cuando estas haciendo una inicializacion directamente
    en una propiedad significa que van a tomar el valor por defecto.
  */

  // Output: permite la salida de componente hacia componentes padres se hace a traves de la sintaxis.
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    if (newValue >= 100) {
     this.progreso = 100;
   }

   else if (newValue <= 0) {
     this.progreso = 0;
   }

   else {
    this.progreso = newValue;
   }

    // uitiliza el elemento Hash asignada
    this.txtProgress.nativeElement.value = this.progreso;

    // emite un nuevo valor y actualiza el padre.
    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

  // funcion para incrementar la barra de progreso
  cambiarValor( valor: number ) {

    if ((this.progreso >= 100) && (valor > 0)) {

      this.progreso = 100;
      return;
    }

    else if ((this.progreso <= 0) && (valor < 0)) {

      this.progreso = 0;
      return;
    }

    this.progreso += valor;

    // se invoca el evento y emite el valor progreso en ese momento.
    this.cambioValor.emit(this.progreso);
  }
}
