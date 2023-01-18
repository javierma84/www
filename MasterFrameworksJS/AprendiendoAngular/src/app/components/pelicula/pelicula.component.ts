import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent {
  @Input()
  pelicula!: Pelicula;

  @Output()
  MarcarFavorita = new EventEmitter();

  constructor() {
        
  }

  seleccionar(event: MouseEvent, pelicula: Pelicula){
    this.MarcarFavorita.emit({
      pelicula: pelicula
    });
  }
}
