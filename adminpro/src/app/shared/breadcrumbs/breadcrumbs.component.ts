import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  // titulo de la pagina
  titulo: string;

  constructor( private router: Router, private title: Title,
                private meta : Meta ) {

    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;

      // establece el titulo de la pagina
      this.title.setTitle(this.titulo);

      // crea los atributos del meta-tag
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag( metaTag );
    });
   }

   getDataRoute() {

    return this.router.events.pipe(

      // se filtran los datos
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd)  => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data ));
   }

  ngOnInit() {
  }

}
