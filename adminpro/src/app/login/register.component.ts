import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as swal from 'sweetalert';

// servicios
import { UsuarioService } from './../services/services.index';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']  // se reutiliza el estilo CSS del login
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    /*
      Para construir y validar el formulario HTML se necesita controlar los datos
      que salen de ese formulario por el lado del cliente se enecesitan de 2 parametros
      uno es el valor que almacena el formulario y la otra es la validacion.
    */

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2')});


    // establece los valores en el formulario
    this.forma.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
     //  swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      console.log('Debe aceptar las condiciones');
      return;
    }

    console.log('forma valida:', this.forma.valid);
    console.log(this.forma.value);
  }

  sonIguales(campo1: string, campo2: string) {

    // esta funcion espera retornar un booleano
    return (group: FormGroup) => {

      // obtiene el valor de los formularios
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true };
    }
  }

}
