import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  progreso: number = 50;
  leyenda : string = 'Leyenda';

  constructor() { }

  ngOnInit() {
  }

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
  }
}
