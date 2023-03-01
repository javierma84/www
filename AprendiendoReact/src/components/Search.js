import React from "react";
import Sidebar from "./Sidebar";
import Slider from "./Slider";
import { useParams } from "react-router-dom";
import Articles from "./Articles";

const Search = () => {
    var searched = useParams().search;
    console.log(searched);

    return (
        <div className="blog">
            <Slider
                title={'Busqueda: ' + searched}
                size="slider-small"
            />

            <div className="center">
                <div id="content">
                    {/*Listado de Articulos que vendran de la API rest de node */}
                    <Articles
                        search={searched}
                    />
                </div>

                <Sidebar
                    blog="true"
                />
            </div>
        </div>
    );

};



export default Search;