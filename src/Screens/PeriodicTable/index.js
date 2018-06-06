import React, { Component,  } from 'react';

import { data } from './data.js';

import './styles.css';

class PeriodicTable extends Component {
  state = { group: 'Todos', period: 'Todos', selectedElement: 1 }

  arrayGroups = ['Todos',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
  arrayPeriod = ['Todos',1,2,3,4,5,6,7];

  getElementsList = () => {
    let filtered = data
    if (this.state.group !== 'Todos') {
      filtered = filtered.filter(element => element.xpos === parseInt(this.state.group, 10))
    }
    if (this.state.period !== 'Todos') {
      filtered = filtered.filter(element => element.period === parseInt(this.state.period, 10))
    }
    return filtered
  }

  changePeriod = event => this.setState({ period: event.target.value })
  changeGroup = event => this.setState({ group: event.target.value })
  changeElement = event => {
    const result = data.find(element => element.number === parseInt(event.target.value))
    this.setState({ selectedElement: event.target.value || null, result: result ? result : {} })
  }

  render() {
    return (
      <div className="App">
        <form className="users-selects">
          <h2>Buscar por:</h2>
          <div className="fiters-container">
            <div className="filter-container">
              <h2>Periodo</h2>
              <select name="period" onChange={this.changePeriod} value={this.state.period} ref="period">
                {this.arrayPeriod.map(i => <option id={i} value={i}>{i}</option>)}
              </select>
              </div>
            <div className="filter-container">
              <h2>Grupo</h2>
              <select name="group" onChange={this.changeGroup} value={this.state.group} ref="group">
                {this.arrayGroups.map(i => <option id={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="filter-container">
              <h2>Elemento</h2>
              <select name="particula" onChange={this.changeElement} value={this.state.selectedElement} ref="particula">
                {this.getElementsList().map(element => <option id={element.number} value={element.number}>{element.name}</option>)}
              </select>
            </div>
          </div>
        </form>
        <div className="results-container">
          {this.state.result && Object.keys(this.state.result).map(label => (
            <p>
              {`${label}: ${this.state.result[label] || ''}`}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
export default PeriodicTable;
