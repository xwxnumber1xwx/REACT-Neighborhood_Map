import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Sidebar/>
          <Map/>
        </div>
    );
  }
}

export default App;
