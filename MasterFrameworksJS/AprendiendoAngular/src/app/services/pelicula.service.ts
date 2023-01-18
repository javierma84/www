import { Injectable } from '@angular/core'
import { Pelicula } from '../models/pelicula'

@Injectable()
export class PeliculaService {

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Spiderman 4", 2019, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/1200px-Spider-Man.jpg'),
            new Pelicula("Spiderman 5", 2019, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/1200px-Spider-Man.jpg'),
            new Pelicula("Vengadores", 2020, 'https://i.blogs.es/debdc9/1629460557_098553_1629460592_portada_normal/840_560.jpeg'),
            new Pelicula("Batman", 2021, 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2022/03/batman-2639953.jpg?itok=3PWK0xoH'),
            new Pelicula("Batman 2", 2022, 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2022/03/batman-2639953.jpg?itok=3PWK0xoH')
          ];
    }

    holaMundo() {
        return 'Hola Mundo desde un servicio de Angular!';
    }

    getPeliculas(){
        return this.peliculas;
    }
}