import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RingLoader, BounceLoader } from 'halogen'

import Home from './Screens/Home';
import Transformation from './Screens/Transformation';
import Presiones from './Screens/Presiones';
import Estequimetria from './Screens/Estequimetria';

import './styles.css';

const Main = () => (
  <Router>
    <div>
      <div className="App-header">
        <RingLoader color="#26A65B" size="40px" margin="8px"/>
      </div>
      <div className="tabs-header">
        <Link className="tabs-container" to="/home">Página Principál</Link>
        <Link className="tabs-container" to="/transformation">Transformación</Link>
        <Link className="tabs-container" to="/presiones">Calcular presiones</Link>
        <Link className="tabs-container" to="/estequimetria">Estequimetría</Link>
      </div>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/transformation" component={Transformation} />
      <Route path="/presiones" component={Presiones} />
      <Route path="/estequimetria" component={Estequimetria} />
    </div>
  </Router>
);

export default Main;
