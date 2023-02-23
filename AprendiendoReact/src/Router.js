import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'

import SeccionPruebas from "./components/SeccionPRuebas";
import MiComponente from "./components/MiComponente";
import Peliculas from "./components/Peliculas";
import Error from "./components/Error";
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from "./components/Home";

class Router extends Component {
    render() {

        function Parametros() {
            let params = useParams();
            let { apellidos } = useParams();
            let siApellidos = (null);

            if (params.apellidos) {
                siApellidos = (
                    <h2 className="subheader">Prueba obtener apellidos: {apellidos}</h2>
                );
            }

            return (
                <div id="content">
                    <h2 className="subheader">Prueba obtener nombre: {params.nombre}</h2>
                    {siApellidos}
                </div>
            );
        }

        return (
            <BrowserRouter>
                <Header />
                
                

                    {/*configurar rutas y paginas*/}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/ruta-prueba" element={<SeccionPruebas />} />
                        <Route path="/segunda-ruta" element={<MiComponente />} />

                        <Route exact path="/pagina-1" element={
                            <React.Fragment>
                                <h1>Hola mundo desde la ruta /pagina-1</h1>
                                <p>
                                    Esta ruta tiene desarrollado <code>JSX</code> dentro del
                                    element
                                </p>
                                <MiComponente saludo="Saludos cordiales"></MiComponente>
                            </React.Fragment>
                        }
                        />

                        <Route exact path="/pruebas/:nombre/:apellidos?" element={<Parametros />} />

                        <Route path="*" element={<Error />} />
                    </Routes>

                    <div className='clearfix' />
                
                <Footer />
            
            </BrowserRouter >
        );
    }
}

export default Router;