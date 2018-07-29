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
        this.props.markers.filter((marker) => {
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
                    }
                })
            }
            else
                marker.infowindow.close(this.props.map, marker);
        })
    }

    render() {
        const { filteredPlace } = this.props
        return (
            <nav className='sidebar'>
                <div role='button' aria-label='open/close slide-bar' onKeyPress={this.openCloseSideBar} onClick={this.openCloseSideBar} className='hamburger-icon' tabIndex='0'></div>
                <span className="text">Best Restaurants</span>
                <input id='find-here' aria-label='search in this part of map' role='button' type='button' value='Find restaurants here' />
                <p>
                    <input aria-label='filter show' className='places-filter' type='text'
                        onChange={(event) => { this.props.updateFilter(event.target.value) }} placeholder='Filter' />
                    <ul id='places-list' aria-label='list places'>
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
                </p>
            </nav>
        )
    }
}
export default Sidebar