/*global google*/
import React, { Component } from 'react';
import $ from 'jquery'


class Sidebar extends Component {

    //open or close the Sidebar
    openCloseSideBar() {
        $('.sidebar').toggleClass('close')
    }

    // show selected item on the map
    showMarker = (event) => {
        this.props.markers.filter(marker => {
            if (marker.id === event.target.value) {
                this.props.infowindows.filter(infowindow => {
                    if (infowindow.id === marker.id) {
                        //set animation for selected marker
                        if (marker.getAnimation() !== null) {
                            marker.setAnimation(null)
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE)
                            setTimeout(marker.setAnimation(null), 300)
                        }
                        // show info
                        infowindow.open(this.props.map, marker)
                    } else {
                    }
                })
            }
        })
    }

    render() {
        const { filteredPlace } = this.props
        return (
            <nav className='sidebar'>
                <div role='button' aria-label='open/close slide-bar' onClick={this.openCloseSideBar} className='hamburger-icon' tabIndex='0'></div>
                <h2 className="text">Filter places</h2>
                <input aria-label='filter showed Hospital' className='places-filter' type='text'
                    onChange={(event) => { this.props.updateFilter(event.target.value) }} placeholder='Ex: Universitätsklinik' />
                <input id='find-hospital' aria-label='search hospital in this part of map' role='button' type='button' value='Find Hospitals here' />
                <ul id='places-list' aria-label='list of Hospitals'>
                    {
                        filteredPlace && (
                            filteredPlace.map((place) => (
                                <li key={place.id} className='button-list'>
                                    <button className='button' type='button' onClick={this.showMarker} value={place.id}>
                                        {place.name}</button>
                                </li>
                            ))
                        )}
                </ul>
            </nav>
        )
    }
}
export default Sidebar