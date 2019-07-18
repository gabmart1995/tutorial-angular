import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
  ) {

  }

  canActivate() {
    
    if ( this._usuarioService.usuario.rol  === 'ADMIN_ROLE' ) {

      return true;

    }

    else {

      // saca al usuario de la aplicacion
      this._usuarioService.logout();
      return false;
    }


  }
  
}
