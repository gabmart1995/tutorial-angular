import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // importa el archivo CSS generado.
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins(); // carga los plugins de JavaScript
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }
/*
    console.log(forma.valid);
    console.log(forma.value);*/
  }

}
