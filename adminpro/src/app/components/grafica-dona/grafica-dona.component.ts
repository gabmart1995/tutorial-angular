import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  // variables de entrada
  @Input() titulo: string;
  @Input() leyenda: string[];
  @Input() datos: number[];
  @Input() tipoGrafica: string;

  constructor() { }

  ngOnInit() {
  }

}
