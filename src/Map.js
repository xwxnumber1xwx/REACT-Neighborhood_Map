/*global google*/
import React, { Component } from 'react'

//initial position
const VATICAN_CITY = {
    lat: 41.903606,
    lng: 12.453165
}

class Map extends Component {

    //some code took from https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
    componentDidMount() {
        window.initMap = this.initMap
        this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB-q-3KW1wmnFce3L499git68ojKRQ5qhs&v=3&callback=initMap')
    }

    //initialization Google Maps
    initMap() {
        // create new map
        let pos = VATICAN_CITY;
        let map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 13,
        })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos)
            }
            )
        }
    }

    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}



export default Map;