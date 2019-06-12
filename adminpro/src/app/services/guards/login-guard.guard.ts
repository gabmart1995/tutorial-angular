import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      console.log('paso por el GUARD');
      return true;
    }
    else {

      // muestra el mensaje y redirecciona al login
      console.log('Bloqueado por el GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
