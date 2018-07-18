import React, { Component,  } from 'react';
import { BounceLoader } from 'halogen'

import { getPresiones } from '../../api/api';

import './styles.css';

class Presiones extends Component {
  state = { productos: [], reactivos: [], done: false }

  handleValue = () => {
    if (parseFloat(this.refs.valor.value, 10) <= 0) {
      return window.confirm("Debe ingresar un valor de Gramos/Moles mayor a 0");
    }
    if (this.refs.elemento.value === "") {
      return window.confirm("Debe seleccionar al menos 1 elemento de la reacción");
    }
    if (this.state.reactivos.length === 0 || this.state.productos.length === 0) {
      return window.confirm("Debe indicar al menos una molecula en reactivos y una en productos");
    }

    let index = this.state.reactivos.findIndex(element => element.name === this.refs.elemento.value)
    let ubicacion = 'reactivos'
    if (index === -1) {
      index = this.state.productos.findIndex(element => element.name === this.refs.elemento.value)
      if (index === -1) {
        return window.confirm("El elemento seleccionado no coincide con ninguno de los de la reacción");
      }
      ubicacion = 'productos'
    }

    let molRef
    let gramRef

    if(this.refs.tipoDato.value === "Gramos") {
      gramRef = parseFloat(this.refs.valor.value,10).toFixed(3)
      if (ubicacion === 'reactivos') {
        molRef = (gramRef / this.state.reactivos[index].pesMol).toFixed(3)
      } else {
        molRef = (gramRef / this.state.productos[index].pesMol).toFixed(3)
      }
    } else {
      molRef = parseFloat(this.refs.valor.value, 10).toFixed(3)
      if (ubicacion === 'reactivos') {
        gramRef = (molRef * this.state.reactivos[index].pesMol).toFixed(3)
      } else {
        gramRef = (molRef * this.state.productos[index].pesMol).toFixed(3)
      }
    }
    // obtengo gramos y moles del input a medir. Ahora busco y completo en los demas

    const reactivos = this.state.reactivos.map((elem, i) => {
      return ubicacion === 'reactivos' && i === index ?
      {
        ...elem,
        moles: molRef,
        gramos: gramRef
      } :
      {
        ...elem,
        moles: (molRef * elem.numMol / this.state[ubicacion][index].numMol).toFixed(3),
        gramos: (gramRef * (elem.pesMol * elem.numMol) / (this.state[ubicacion][index].numMol * this.state[ubicacion][index].pesMol)).toFixed(3)
      }
    })

    const productos = this.state.productos.map((elem, i) => {
      return ubicacion === 'productos' && i === index ?
      {
        ...elem,
        moles: molRef,
        gramos: gramRef
      } :
      {
        ...elem,
        moles: (molRef * elem.numMol / this.state[ubicacion][index].numMol).toFixed(3),
        gramos: (gramRef * (elem.pesMol * elem.numMol) / (this.state[ubicacion][index].numMol * this.state[ubicacion][index].pesMol)).toFixed(3)
      }
    })
    this.setState({ reactivos, productos, done: true })
  }

  addElement = e => {
    if (this.refs.nomMol.value === "") {
      return window.confirm("El nombre del elemento es incorrecto.");
    }
    if (parseFloat(this.refs.numMol.value, 10) <= 0) {
      return window.confirm("El número de moles debe ser un número positivo mayor a cero.");
    }
    if (parseFloat(this.refs.pesMol.value, 10) <= 0) {
      return window.confirm("El peso molecular debe ser un número positivo mayor a cero.");
    }
    e.preventDefault()
    if (this.refs.type.value === "Productos") {
      this.setState(prevState => ({ productos: prevState.productos.concat({ name: this.refs.nomMol.value, numMol:  parseFloat(this.refs.numMol.value, 10), pesMol:  parseFloat(this.refs.pesMol.value, 10) })}))
    } else {
      this.setState(prevState => ({ reactivos: prevState.reactivos.concat({ name: this.refs.nomMol.value, numMol:  parseFloat(this.refs.numMol.value, 10), pesMol:  parseFloat(this.refs.pesMol.value, 10) })}))
    }

  }

  clear = e => {
    e.preventDefault()
    this.setState(prevState => ({ productos: [], reactivos:[], done: false }))
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
      <div className="est-App">
        <div>
          <div className="est-users-handler">
          <h1>Estequiometría</h1>
            <div className="est-all-data">


              <button className="est-result2-button"  onClick={this.guia}>GUIA</button>
              <form className="est-users-inputs">
                <fieldset className="est-inputs">
                    <legend>Elementos</legend>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div  className="est-inputField">
                          <p>Moles</p>
                          <input type="text" ref="numMol"/>
                        </div>
                        <div  className="est-inputField">
                          <p>Molecula</p>
                          <input type="text" ref="nomMol"/>
                        </div>
                        <div className="est-inputField">
                          <p>Peso Molecular</p>
                          <input type="text" ref="pesMol"/>
                        </div>
                        <div className="est-inputField">
                          <p>¿Reactivo o Producto?</p>
                          <select name="type" ref="type">
                            <option value="Reactivos">Reactivo</option>
                            <option value="Productos">Producto</option>
                          </select>
                        </div>
                        <button className="est-result2-button"  onClick={this.addElement}>Agregar elemento</button>
                        <button className="est-result2-button"  onClick={this.clear}>Borrar Elementos</button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', alignSelf:'center',alignItems:' center', justifyContent:'center', borderTop: '1px solid black', borderBottom: '1px solid black', margin:'20px 0'}}>
                      {this.state.reactivos.length > 0 && this.state.reactivos.map((elem, i) => (
                        <p style={{ marginRight: '15px' }}>{`${elem.numMol !== 1 ? elem.numMol : ''} ${elem.name} ${this.state.reactivos.length - 1 !== i ? '+' : ''}`}</p>
                      ))}
                      =>
                      {this.state.productos.length > 0 && this.state.productos.map((elem, i) => (
                        <p style={{ marginRight: '15px', marginLeft: `${i === 0 ? 15 : 0 }px`}}>{`${elem.numMol !== 1 ? elem.numMol : ''} ${elem.name} ${this.state.productos.length - 1 !== i ? '+' : ''}`}</p>
                      ))}
                      </div>
                    </div>


                    <p>Calcular los valores teóricos dados:</p>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                      <div className="est-inputField">
                        <p>Gramos o Moles</p>
                        <select name="tipoDato" ref="tipoDato">
                          <option value="Gramos">Gramos</option>
                          <option value="Moles">Moles</option>
                        </select>
                      </div>
                      <div className="est-inputField">
                        <p>Valor</p>
                        <input type="text" ref="valor"/>
                      </div>
                      <div className="est-inputField">
                        <p>Elemento</p>
                        <input type="text" ref="elemento"/>
                      </div>
                    </div>
                  </fieldset>

              </form>


              <button className="est-result2-button"  onClick={this.handleValue}>Procesar</button>
              {this.state.done ? <fieldset className="est-inputs" style={{minWidth: '400px', paddingTop: '20px', marginTop: '20px'}}>
                <legend>Resultados</legend>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {this.state.reactivos.length > 0 && this.state.reactivos.map((elem, i) => (
                      <div style={{width: '150px',display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                        <p style={{borderBottom: '1px solid black', paddingBottom: '10px'}}>{`${elem.numMol !== 1 ? elem.numMol : ''} ${elem.name} ${this.state.reactivos.length - 1 !== i ? '+' : ''}`}</p>
                        <p>{`${elem.gramos} gr.`}</p>
                        <p>{`${elem.moles} mol.`}</p>
                      </div>
                    ))}
                  =>
                    {this.state.productos.length > 0 && this.state.productos.map((elem, i) => (
                      <div style={{width: '150px',display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                        <p style={{borderBottom: '1px solid black', paddingBottom: '10px'}}>{`${elem.numMol !== 1 ? elem.numMol : ''} ${elem.name} ${this.state.reactivos.length - 1 !== i ? '+' : ''}`}</p>
                        <p>{`${elem.gramos} gr.`}</p>
                        <p>{`${elem.moles} mol.`}</p>
                      </div>
                    ))}
                </div>
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
