/*global google*/
import React, { Component } from 'react'
//import $ from 'jquery'

//initial position
const GERMANY = {
    lat: 49.487433,
    lng: 8.467411
}

let pos = GERMANY
let newMap
let newPlaces = []
let newMarkers = []
let newInfowindows = []

class Map extends Component {

    // get user's location
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        }

    }

    componentDidMount() {
        this.getGeoLocation()
        window.initMap = this.initMap
        this.loadJS('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB-q-3KW1wmnFce3L499git68ojKRQ5qhs&v=3&callback=initMap')
        //console.log('this componentDidMount:'),
        //console.log(this)
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
        //console.log('this initMap:')
        //console.log(this)
        const thisMap = this
        //button Find Hospitals
        const findHospital = document.getElementById('find-hospital');
        findHospital.addEventListener('click', function () {
            //clear old research
            for (let item of thisMap.props.markers) {
                item.setMap(null)
                //console.log(item + ' deleted')
            }
            //clear markers list
            newMarkers = []
            thisMap.props.updateMarkers(newMarkers)
            console.log('CLEARED MARKERS')
            console.log(thisMap.props.markers)
            //clear places
            newPlaces = []
            thisMap.props.updatePlaces(newPlaces)
            //clear infowindows
            newInfowindows = []
            thisMap.props.updateInfowindows(newInfowindows)
            //console.log(thisMap.props)
            //console.log('thisMap.props')
            //console.log('find-hospital')
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
        //console.log('this callback:')
        //console.log(this)
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
        //console.log('MARKERS')
        //console.log(this.props.markers)
    };
    //add new marker
    createMarker = (place) => {
        let marker = new google.maps.Marker({
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
        //console.log('place.name')
        //console.log(place.name)
        //add element to newInfowindows array
        newInfowindows.push(infowindow)
        return marker
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}



export default Map;