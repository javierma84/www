import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  
  public titulo: string;
  public peliculas: Pelicula[];
  public favorita!: Pelicula;
  public fecha: any;

  constructor(
    private _peliculaService: PeliculaService
  ){
    this.titulo = "Componente películas";
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha = new Date(2022,12,30);
    console.log("Constructor lanzado...");
  }

  ngOnDestroy(): void {
    console.log("El componente se va a eliminar");
  }

  ngDoCheck(): void {
    console.log("DoCheck lanzado");
  }

  ngOnInit(): void {
    console.log("Componente iniciado");
    console.log(this._peliculaService.holaMundo());
  }

  cambiarTitulo(){
    this.titulo = "Titulo cambiado";
  }  

  mostrarFavorita(event: any){
    this.favorita = event.pelicula;
  }

}
