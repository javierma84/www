import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input() public nombre: string;
  @Input() public size!: string;

  constructor(){
    this.nombre = 'Bienvenido al Curso de Angular con Víctor Robles de victorroblesweb.es';
  }
}
