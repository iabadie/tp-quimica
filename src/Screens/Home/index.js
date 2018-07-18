import React, { Component,  } from 'react';
import { Link } from "react-router-dom";

import './styles.css';

class Home extends Component {

  render() {
    return (
      <div className="home-container">
        <h3>Bienvenido a la Químic-APP</h3>
        <h4>Te invitamos a disfrutar de las siguientes funcionalidades:</h4>
        <div className="links-container">
          <Link className="each-link" to="transformation">Convertir Agua líquida o solida en vapor!</Link>
          <Link className="each-link" to="Presiones">Calcular presiones</Link>
          <Link className="each-link" to="Estequimetria">Estequimetría</Link>
        </div>
      </div>
    );
  }
}
export default Home;
