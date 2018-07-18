import React, { Component,  } from 'react';
import { BounceLoader } from 'halogen'

import { getPresiones } from '../../api/api';

import './styles.css';

class Presiones extends Component {
  state = { presiones: [], elementos: [], total: null}

  handleValue = () => {
    if (this.refs.temp.value <= -273) {
      return window.confirm("La temperatura no puede ser igual o inferior al cero absoluto.");
    }
    if (this.refs.vol.value <= 0) {
      return window.confirm("El volumen debe ser un número positivo mayor a cero.");
    }
    if (this.state.elementos.length === 0) {
      return window.confirm("Debe seleccionar al menos 1 elemento");
    }
    const parciales = this.state.elementos.map(elem => getPresiones(elem, parseFloat(this.refs.temp.value, 10), parseFloat(this.refs.vol.value, 10)));
    const total = parciales.reduce((acum, act) => acum + parseFloat(act.value, 10), 0)
    this.setState({ presiones: parciales, total });
  }

  addElement = e => {
    if (this.refs.molName.value === "") {
      return window.confirm("El nombre del elemento es incorrecto.");
    }
    if (this.refs.molValue.value <= 0) {
      return window.confirm("El número de moles debe ser un número positivo mayor a cero.");
    }
    e.preventDefault()
    this.setState(prevState => ({ elementos: prevState.elementos.concat({ name: this.refs.molName.value, value:  parseFloat(this.refs.molValue.value, 10)}) }))
  }

  clear = e => {
    e.preventDefault()
    this.setState(prevState => ({ elementos: []}))
  }


  validarNumero = (event) => {
    const patron =/[0-9]*/;
    const value = event.nativeEvent.target.value;
    const entero = parseInt(value, 10);
    const test = patron.test(value);
    return test && entero;
  }

  guia = () => {
    window.confirm("Ingrese los valores constantes de VOLUMEN y TEMPERATURA,\nluego agregue los gases que desea incorporar a la mezcla con sus respectivos números molares.\n Al presionar en PROCESAR obtendrá los valores de presiones parciales y el total, asi como las fracciones molares.");
  }

  render() {

    return (
      <div className="pre-App">
        <div>
          <div className="pre-users-handler">
          <h1>Calculadora de Presiones en mezcla de gases</h1>
            <div className="pre-all-data">


              <button className="pre-result2-button"  onClick={this.guia}>GUIA</button>
              <form className="pre-users-inputs">
                  <fieldset className="pre-inputs" style={{ display: 'flex', flexDirection: 'row', minWidth: '300px' }}>
                    <legend>Constantes:</legend>
                      <div className="pre-inputField">
                        <p>Ingrese la temperatura (en kelvin)</p>
                        <input type="text" ref="temp" />
                      </div>
                      <div  className="pre-inputField">
                        <p>Ingrese el volumen (en litros)</p>
                        <input type="text" ref="vol"/>
                      </div>
                  </fieldset>

                  <fieldset className="pre-inputs">
                    <legend>Elementos</legend>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div  className="pre-inputField">
                          <p>Símbolo</p>
                          <input type="text" ref="molName"/>
                        </div>
                        <div  className="pre-inputField">
                          <p>Moles</p>
                          <input type="text" ref="molValue"/>
                        </div>
                        <button className="pre-result2-button"  onClick={this.addElement}>Agregar elemento</button>
                        <button className="pre-result2-button"  onClick={this.clear}>Borrar Elementos</button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                      {this.state.elementos.length > 0 && this.state.elementos.map(elem => (
                        <p style={{ marginRight: '15px' }}>{`${elem.name} = ${elem.value} moles.`}</p>
                      ))}
                      </div>
                    </div>
                  </fieldset>

              </form>

{/*

              // <button className="pre-result-button"  onClick={this.handleValue}>Procesar</button>
              //
              // <div className="pre-results">
              // <fieldset className="pre-inputs">
              //   <legend>Resultados:</legend>
              //     <div className="pre-inputField">
              //       <p>{`Presion Total del sistema:       ${this.state.calor || ""} ${this.state.calor ? "KJ" : ""}`}</p>
              //     </div>
              //     <div  className="pre-inputField">
              //       <p>{`Variación de Entropia Total:      ${this.state.entropia || ""}  ${this.state.calor ? "KJ/Kel" : ""}`}</p>
              //     </div>
              // </fieldset>
              // </div>



              */}
              <button className="pre-result2-button"  onClick={this.handleValue}>Procesar</button>
              {this.state.presiones.length > 0 ? <fieldset className="pre-inputs" style={{minWidth: '400px', paddingTop: '20px', marginTop: '20px'}}>
                <legend>Resultados</legend>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                  {this.state.presiones.length > 0 && this.state.presiones.map(elem => (
                    <p style={{ display: 'flex', flexDirection: 'row', marginRight: '15px', fontSize:'16px' }}>P<p style={{fontSize: 12}}>{`${elem.name}`}</p>{` = ${elem.value} atm.`}</p>
                  ))}
                </div>
                {this.state.total > 0 && (
                  <div>
                    <p>Presion total</p>
                    <p>{this.state.total} atm.</p>
                  </div>)
                }
              </fieldset> : <div className="esperando" style={{ marginTop: '20px' }}>
                  <BounceLoader color="#26A65B" size="60px" margin="12px"/>
                  <h2>Esperando datos de entrada</h2>
                </div>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Presiones;
