import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {

  state = {
    places: []
  }
  render() {
    const { places } = this.state
    return (
        <div className="App">
          <Sidebar places={places}/>
          <Map places={places}/>
        </div>
    );
  }
}

export default App;
