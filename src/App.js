import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';


class App extends Component {

  state = {
    places: [],
    markers: [],
    infowindows: [],
    map: '',
    filteredPlace: []
  }

  updatePlaces = (places) => {
    this.setState({ places })
    this.setState({ filteredPlace: places})
    console.log('PLACES')
    console.log(this.state.places)
  }

  updateMarkers = (markers) => {
    this.setState({ markers })
  }

  updateInfowindows = (infowindows) => {
    this.setState({ infowindows })
  }

  updateMap = (map) => {
    this.setState({ map })
  }

  updateFilter = (query) => {
      if (query) {
          let result = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
          console.log(this.state.newPlaces)
          this.setState({ filteredPlace: result })
      }
  }

  render() {
    const { map, places, markers, infowindows, filteredPlace } = this.state
    return (
      <div className="App">
        <Sidebar map={map} infowindows={infowindows} markers={markers} places={places}
        filteredPlace={filteredPlace} updateFilter={this.updateFilter}/>
        <Map map={map} infowindows={infowindows} markers={markers} places={places}
          updateMap={this.updateMap} updateInfowindows={this.updateInfowindows} updateMarkers={this.updateMarkers} updatePlaces={this.updatePlaces}
        />
      </div>
    );
  }
}

export default App;
