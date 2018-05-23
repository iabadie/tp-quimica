import React, { Component,  } from 'react';
import { RingLoader, BounceLoader } from 'halogen'

import Resultados from './Resultados';
import { initProcess } from './api/api';
import './App.css';

class App extends Component {
  state = { datos: [], resultEntropia: [], temp: "", calor: null, entropia: null}

  handleValue = () => {
    if (this.refs.estado.value === "Hielo" && this.refs.tempInicial.value > 0) {
      return window.confirm("HIELO O AGUA?\n\nEl estado elegido es HIELO, por lo que su temperatura debe ser menor o igual a 0 (cero) Cº .");
    }
    if (this.refs.estado.value !== "Hielo" && this.refs.tempInicial.value < 0) {
      return window.confirm("HIELO O AGUA?\n\nEl estado elegido es AGUA, por lo que su temperatura debe ser mayor o igual a 0 (cero) Cº y menor o igual a 100 (cien) Cº .");
    }
    const resultados = initProcess(parseFloat(this.refs.tempInicial.value, 10), parseFloat(this.refs.masa.value, 10), this.refs.estado.value);
    console.log(resultados);
    this.setState({datos: resultados.data, calor: resultados.QalorTotalSuministrado, entropia: resultados.EntropiaTotal, resultEntropia: resultados.entropia});
  }

  validarNumero = (event) => {
    const patron =/[0-9]*/;
    const value = event.nativeEvent.target.value;
    const entero = parseInt(value, 10);
    const test = patron.test(value);
    return test && entero;
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <RingLoader color="#26A65B" size="40px" margin="8px"/>
          <h2>LA FÍSICA A TU ALCANCE</h2>
        </div>
        <div>
          <div className="users-handler">
          <h1>¿Cuanto calor necesito para obtener vapor?</h1>
            <div className="all-data">



              <form className="users-inputs">
                <div>
                  <fieldset className="inputs">
                    <legend>Necesito conocer algo primero:</legend>
                      <div className="inputField">
                        <p>Ingrese la temperatura inicial del elemento ( en Cº )</p>
                        <input type="text" ref="tempInicial" />
                      </div>
                      <div  className="inputField">
                        <p>Ingrese la masa del elemento ( en Kg )</p>
                        <input type="text" ref="masa"/>
                      </div>
                      <div className="inputField">
                        <p>Seleccione el estado inicial del elemento</p>
                        <select name="estado" ref="estado">
                          <option value="Hielo">Hielo</option>
                          <option value="Agua">Agua</option>
                        </select>
                      </div>
                  </fieldset>
                </div>
              </form>


              <button className="result-button"  onClick={this.handleValue}>Procesar</button>

              <div className="results">
              <fieldset className="inputs">
                <legend>Resultados:</legend>
                  <div className="inputField">
                    <p>{`Calor Total Suministrado:       ${this.state.calor || ""} ${this.state.calor ? "KJ" : ""}`}</p>
                  </div>
                  <div  className="inputField">
                    <p>{`Variación de Entropia Total:      ${this.state.entropia || ""}  ${this.state.calor ? "KJ/Kel" : ""}`}</p>
                  </div>
              </fieldset>
              </div>




            </div>
          </div>
          {
            this.state.datos.length ?
            <div>
              <div>
                <p>Temperatura en función del calor suministrado</p>
                <Resultados datos={this.state.datos} x="KJ" y="ºC"/>
              </div>
              <div>
                <p>Temperatura en función de la variación de entropía</p>
                <Resultados datos={this.state.resultEntropia} x="KJ/Kel" y="ºC"/>
              </div>
              <div>
                <p>Temperatura en función del Tiempo</p>
                <Resultados datos={this.state.datos.map(dato => ({x: (dato.x/20), y: dato.y}))} x="Min" y="ºC"/>
              </div>
            </div>
              : <div className="esperando">
                  <BounceLoader color="#26A65B" size="60px" margin="12px"/>
                  <h2>Esperando datos de entrada</h2>
                </div>
          }
        </div>
      </div>
    );
  }
}
export default App;
