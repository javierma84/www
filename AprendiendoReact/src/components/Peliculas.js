import React, { Component } from "react";

import MensajeEstatico from "./MensajeEstatico";
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Peliculas extends Component {

    state = {

    };

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        //var random = Math.floor(Math.random() *3);

        peliculas[0].titulo = "Batman Begins";

        this.setState({
            peliculas: peliculas
        });
    }

    favorita = (pelicula, indice) => {
        console.log("Favorita");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    componentWillMount() {
        //alert("Se va a montar el componente");
        this.setState({
            peliculas: [
                {
                    titulo: 'Batman vs Superman',
                    image: 'https://sm.ign.com/t/ign_es/screenshot/default/batmanvsuperman-dawnofjusticeultimateedition_jjgj.1280.jpg'
                },
                {
                    titulo: 'Gran Torino',
                    image: 'https://www.magazinema.es/wp-content/uploads/2020/01/grantorino-708x350@2x.jpg'
                },
                {
                    titulo: 'Looper',
                    image: 'https://i.blogs.es/1bf2df/looper_movie_banner_by_dcomp-d5d7awv_650/1366_2000.jpg'
                }
            ],
            nombre: 'Javier Martínez',
            favorita: {}
        });
    }

    componentDidMount() {
        //alert("Ya se ha montado el componente");
    }

    componentWillUnmount() {
        //alert("Se va a desmontar el componente");
    }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            );
        } else {
            favorita = (
                <p>No hay película favorita</p>
            )
        }

        return (
            <React.Fragment>
                <Slider
                    title="Peliculas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Selección de las películas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>Cambiar titulo de Batman</button>
                        </p>

                        {/* {this.state.favorita.titulo ? (
                    <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p>
                ) : (
                    <p>No hay película favorita</p>
                )
                } */}

                        {favorita}

                        {/* Crear componenete de películas */}

                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        );
    }

}

export default Peliculas;