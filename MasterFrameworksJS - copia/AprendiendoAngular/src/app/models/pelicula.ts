export class Pelicula{
    // public title: string;
    // public year: number;
    // public image: string;

    // constructor(title: string, year: number, image: string){
    //     this.title = title;
    //     this.year = year;
    //     this.image = image;
    // }

    // Otra forma de definir atributos directamente en el constructor
    constructor(
        public title: string,
        public year: number,
        public image: string
    ){}
}