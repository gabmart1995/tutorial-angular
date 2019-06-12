import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';

import { Usuario } from '../models/usuario.models';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // importa el archivo CSS generado.
})
export class LoginComponent implements OnInit {

  // variables
  recuerdame: boolean = false;
  email: string;

  auth2: any;  // variable de google

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins(); // carga los plugins de JavaScript

    // carga los archivos necesarios para el Google Sign In
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    // si existe el usuario almacenado en localstore se marcara esta opcion
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // inicializacion del plugin de Google (Documentacion)
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1005419055717-6p6n24kj8846ou548c8s6l5992n5q6n0.apps.googleusercontent.com',
        scope: 'profile email'
      });

      // obtiene el perfil del usuario
      this.attachSignIn(document.getElementById('btn-google'));

    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler( element, {}, googleUser => {

      // se obtiene el perfil completo te puede servir
      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      // genera la informacion dentro del servidor
      this._usuarioService.loginGoogle(token)
        .subscribe( () => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    // se suscribe al observador de UsuarioService
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(response => this.router.navigate(['/dashboard']));
  }
}
