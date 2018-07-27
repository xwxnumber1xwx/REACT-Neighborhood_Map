import React, { Component } from 'react';
import $ from 'jquery'


class Sidebar extends Component {

    //open or close the Sidebar
    openCloseSideBar() {
        $('.sidebar').toggleClass('close')
    }

    showMarker = (event) => {
        this.props.markers.filter(marker => {
            if (marker.id === event.target.value) {
                this.props.infowindows.filter(infowindow => {
                    if (infowindow.id === marker.id) {
                        infowindow.open(this.props.map, marker)
                    }
                })
            }
        })
    }

    render() {
        const { filteredPlace } = this.props
        return (
            <div className='sidebar'>
                <div onClick={this.openCloseSideBar} className='hamburger-icon'></div>
                <p className="text">Filter places</p>
               <input className='places-filter' type='text'
                onChange={(event) => {this.props.updateFilter(event.target.value)}} placeholder='Ex: Universitätsklinik'/>
                <input id='find-hospital' type='button' value='Find Hospital' />
                <ul id='places-list'>
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
            </div>
        )
    }
}
export default Sidebar