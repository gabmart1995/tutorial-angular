import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  barra1: number = 20;
  barra2: number = 30;

  constructor() { }

  ngOnInit() {
  }
}
