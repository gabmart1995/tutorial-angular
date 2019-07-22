import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  anio: number = new Date().getFullYear();


  ngOnInit() {
    init_plugins();
  }

}
