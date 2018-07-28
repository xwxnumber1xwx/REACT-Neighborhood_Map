/*global google*/
import React, { Component } from 'react'
//import $ from 'jquery'

//initial position
const MANNHEIM = {
    lat: 49.487433,
    lng: 8.467411
}

let pos = MANNHEIM
let newMap
let newPlaces = []
let newMarkers = []
let newInfowindows = []

class Map extends Component {

    componentDidMount() {
        window.initMap = this.initMap
        this.loadJS('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB-q-3KW1wmnFce3L499git68ojKRQ5qhs&v=3&callback=initMap')
    }

    // code took from https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
    // Asynchronous Loading
    loadJS = (src) => {
        document.getElementById('map').innerText = 'Loading...'
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }
    //initialization Google Maps
    initMap = () => {
        // create new map
        newMap = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 13,
        })

        // Get Places
        const thisMap = this
        //button Find Hospitals
        const findHospital = document.getElementById('find-hospital');
        findHospital.addEventListener('click', function () {
            //clear old search
            for (let item of thisMap.props.markers) {
                item.setMap(null)
            }
            //clear markers list
            newMarkers = []
            thisMap.props.updateMarkers(newMarkers)
            //clear places
            newPlaces = []
            thisMap.props.updatePlaces(newPlaces)
            //clear infowindows
            newInfowindows = []
            thisMap.props.updateInfowindows(newInfowindows)
            let bounds = newMap.getBounds()
            let service = new google.maps.places.PlacesService(newMap);
            service.nearbySearch({
                location: pos,
                radius: 5000,
                type: ['hospital'],
                bounds: bounds
            }, thisMap.callback);
            thisMap.props.updatePlaces(newPlaces)
        })
        findHospital.click();
        this.props.updateMap(newMap)

    }
    callback = (results, status) => {
        console.log('status: ' + status)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length && i < 10; i++) {
                this.createMarker(results[i]);
            }
            //update places
            this.props.updatePlaces(newPlaces)
            this.props.updateMarkers(newMarkers)
            this.props.updateInfowindows(newInfowindows)
        }
    };

    //add new marker
    createMarker = (place) => {
        let marker = new google.maps.Marker({
            name: place.name,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            map: newMap,
            id: place.id
        })
        //this.setState((state) => ({ makers: state.markers.concat(newMarker) }))
        marker = this.addInfowindow(marker, place)
        // add place to places
        newPlaces.push(place)
        newMarkers.push(marker)


    }

    //Add Info
    addInfowindow = (marker, place) => {
        let infowindow = new google.maps.InfoWindow({
            content: place.name,
            id: place.id
        });
        marker.infowindow = infowindow

        // open information when mouse is over
        marker.addListener('mouseover', function () {
            infowindow.open(newMap, marker)
        })

        //close information when mouse in out
        marker.addListener('mouseout', function () {
            this.infowindow.close()
        })
        //add element to newInfowindows array
        newInfowindows.push(infowindow)
        return marker
    }

    render() {
        return (
            <div id='map' tabIndex='-1' role="Maps Application" aria-describedby="map view applications" aria-hidden="true"></div>
        )
    }
}



export default Map;