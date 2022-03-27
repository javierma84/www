var nombre = "Javier Martínez";
var altura = 175;

var concat = nombre + " " + altura;

document.write(concat);

var datos = document.getElementById("datos");
datos.innerHTML = concat;

datos.innerHTML = `
    <h1>Soy la caja de datos</h1>
    <h2>Mi nombre es: ${nombre}</h2>
    <h3>Mido: ${altura}</h3>
`;

var coche = {
    modelo: 'Mercedes Clase A',
    maxima: 300,
    antiguedad: 2020,
    mostrardatos() {
        console.log(this.modelo, this.maxima, this.antiguedad);
    },
    propiedad1: "valor aleatorio"
}

document.write("<h1>" + coche.modelo + "</h1>");
coche.mostrardatos();

//Promesas

var saludar = new Promise((resolve, reject) => {
    setTimeout(() => {
        let saludo = "Hola muy buenas a todos";
        saludo = false;

        if (saludo) {
            resolve(saludo);
        } else {
            reject('No hay saludo disponible');
        }

    }, 2000);

});

saludar
    .then(resultado => {
        alert(resultado);
    })
    .catch(err => {
        alert(err);
    });
