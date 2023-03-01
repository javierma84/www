import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams, Navigate } from 'react-router-dom'

import MiComponente from "./components/MiComponente";
import Peliculas from "./components/Peliculas";
import Error from "./components/Error";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./components/Home";
import Blog from "./components/Blog";
import Formulario from "./components/Formulario";
import Search from "./components/Search";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";

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

        function GetParamsRedirect() {
            let params = useParams();
            return (<Navigate to={'/blog/busqueda/' + params.search} />)
        };

        function GetParamsArticle(){
            let { id } = useParams();
            return(<Article id={id}/>);
        }

        function GetParamsEditArticle(){
            let { id } = useParams();
            return(<EditArticle id={id}/>);
        }

        return (
            <BrowserRouter>
                <Header />

                {/*configurar rutas y paginas*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/crear" element={<CreateArticle/>} />
                    <Route path="/blog/articulo/:id" element={<GetParamsArticle/>} />                    
                    <Route path="/blog/editar/:id" element={<GetParamsEditArticle/>} />
                    <Route path="/blog/busqueda/:search" element={<Search />} />
                    <Route exact path="/redirect/:search" element={<GetParamsRedirect />} />
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/peliculas" element={<Peliculas />} />
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