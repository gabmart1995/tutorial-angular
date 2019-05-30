import { Component, Inject,  OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor ( @Inject(DOCUMENT) private _document ) { }

  ngOnInit() {
  }

  cambiarColor(tema: string) {
    let url = `./assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);
  }
}
