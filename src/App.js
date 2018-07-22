import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      //<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
