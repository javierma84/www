import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})
export class MiComponente{
    public titulo: string;
    public comentario: string;
    public year: number;
    public mostrarPeliculas: boolean;
    
    constructor(){
        this.titulo = 'Hola mundo!';
        this.comentario = 'Este es mi primer componente';
        this.year = 2022;
        this.mostrarPeliculas = true;

        console.log("Componente mi-componente cargado");
        console.log(this.titulo, this.comentario, this.year);

    }

    ocultarPeliculas(){
        console.log("ocultarPeliculas");
        this.mostrarPeliculas = false;
    }
}