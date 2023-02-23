import React, { Component } from "react";

class MiComponente extends Component {

    render() {

        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamon'],
            calorias: 400
        };

        return (
            <div>
                <h1>{'Receta: ' + receta.nombre}</h1>
                <h2>{'Calorías: ' + receta.calorias}</h2>                
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ol>
                {this.props.saludo &&
                    <React.Fragment>
                        <h1>Desde una prop:</h1>
                        <h3>{this.props.saludo}</h3>
                    </React.Fragment>
                }
            </div>
        );
    }

}

export default MiComponente;