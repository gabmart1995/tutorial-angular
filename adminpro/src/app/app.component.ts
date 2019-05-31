import { Component } from '@angular/core';

import { SettingsService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  // se inyecta el servicio y automaticamente ejecuta el constructor
  constructor(public _ajustes: SettingsService) {}
}
