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

  //place update
  updatePlaces = (places) => {
    this.setState({
      places: places,
      filteredPlace: places
    })
  }

  // markers update
  updateMarkers = (markers) => {
    this.setState({ markers })
  }

  // infowindow update
  updateInfowindows = (infowindows) => {
    this.setState({ infowindows })
  }

  //map update
  updateMap = (map) => {
    this.setState({ map })
  }

  // filter the searched items
  updateFilter = (query) => {
    if (query) {
      //find searched item from places
      let result = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
      //find searched item from marker
      let markersResult = this.state.markers.filter((marker) => marker.name.toLowerCase().includes(query.toLowerCase()));
      // set all marker not visible
      this.state.markers.forEach(marker => {
        marker.setVisible(false)
      });
      // set only searched marker to visible
      markersResult.forEach(function(marker) {
        marker.setVisible(true)
      })
      this.setState({
        filteredPlace: result
      })
    } else {
      //set all marker visible when the query is empty
      this.state.markers.forEach(function (marker) {
        marker.setVisible(true)
      })
      this.setState({
        filteredPlace: this.state.places
      })
    }
  }

  render() {
    const { map, places, markers, infowindows, filteredPlace } = this.state
    return (
      <div className="App">
        <Sidebar map={map} infowindows={infowindows} markers={markers} places={places}
          filteredPlace={filteredPlace} updateFilter={this.updateFilter} />
        <Map map={map} infowindows={infowindows} markers={markers} places={places}
          updateMap={this.updateMap} updateInfowindows={this.updateInfowindows} updateMarkers={this.updateMarkers} updatePlaces={this.updatePlaces}
        />
      </div>
    );
  }
}

export default App;
