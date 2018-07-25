/*global google*/
import React, { Component } from 'react'
//import $ from 'jquery'

//initial position
const GERMANY = {
    lat: 51.062350,
    lng: 10.034032
}

let map, pos = GERMANY
let markers = []

class Map extends Component {

    getGeoLocation = () => {
        return new Promise(function (resolve) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve(
                        pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    )
                    console.log('getGeoLocation')
                    console.log(pos)
                })
            }
        })

    }

    componentDidMount() {
        this.getGeoLocation().then(
            window.initMap = this.initMap,
            this.loadJS('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB-q-3KW1wmnFce3L499git68ojKRQ5qhs&v=3&callback=initMap'),
            console.log('this componentDidMount:'),
            console.log(this)
        )
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
        let map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 13,
        })

        // Get Places
        console.log('this initMap:')
        console.log(this)
        //button Find Hospitals
        const findHospital = document.getElementById('find-hospital');
        findHospital.addEventListener('click', function () {
            //clear old research
            for (let item of markers) {
                item.setMap(null)
                console.log(item + ' deleted')
            }
            markers = []
            console.log('find-hospital')
            let bounds = map.getBounds()
            let service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pos,
                radius: 5000,
                type: ['hospital'],
                bounds: bounds
            }, this.callback = (results, status) => {
                console.log('this callback:')
                console.log(this)
                console.log('Status')
                console.log(status)
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log('results.length')
                    console.log(results.length)

                    //create new Marker
                    for (var i = 0; i < results.length; i++) {
                        console.log('createMarker')
                        markers.push(new google.maps.Marker({
                            position: results[i].geometry.location,
                            animation: google.maps.Animation.DROP,
                            map: map,
                        }))
                    }
                } else {
                    console.log('Error service Status')
                    console.log(status)
                }
            });
        })
        findHospital.click();
    }
    callback = (results, status) => {
        console.log('this callback 2:')
        console.log(this)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }
    };
    //add new marker
    createMarker = (place) => {
        let newMarker = new google.maps.Marker({
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            map: map,
        })
        this.setState((state) => ({ makers: state.markers.concat(newMarker) }))
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}



export default Map;