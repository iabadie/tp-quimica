import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RingLoader, BounceLoader } from 'halogen'

import PeriodicTable from './Screens/PeriodicTable';
import Home from './Screens/Home';
import Transformation from './Screens/Transformation';

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
        <Link className="tabs-container" to="/periodicTable">Tabla Periódica</Link>
      </div>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/transformation" component={Transformation} />
      <Route path="/periodicTable" component={PeriodicTable} />
    </div>
  </Router>
);

export default Main;
