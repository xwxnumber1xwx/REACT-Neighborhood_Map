import React, { Component } from 'react';
import $ from 'jquery'

class Sidebar extends Component {

    //open or close the Sidebar
    openCloseSideBar() {
        $('.sidebar').toggleClass('close')
    }

    render() {
        return (
            <div className='sidebar'>
                <div onClick={this.openCloseSideBar} className='hamburger-icon'></div>
                <p className="text">Search for nearby places</p>
                <input className='places-search' type='text' placeholder='Ex: Pizzeria in Rome' />
                <input id="go-places" type="button" value="Go" />
                <input id='find-hospital' type='button' value='Find Hospital'/>
            </div>
        )
    }
}
export default Sidebar