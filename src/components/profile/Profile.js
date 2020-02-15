import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileDetails from './ProfileDetails';
import BookingsHistory from './BookingsHistory';
import M from "materialize-css";

class Profile extends Component {
    componentDidMount(){
        const tabs = document.querySelectorAll('.tabs')
        for (var i = 0; i < tabs.length; i++){
            M.Tabs.init(tabs[i]);
        }
    }
    render() {
        return (
            <div className="user-profile">
                <h3 class="center">My Account</h3>
                <ul class="tabs">
                    <li class="tab col s3"><a class="active" href="#test1"><strong>Update Account</strong></a></li>
                    <li class="tab col s3"><a href="#test2"><strong>Bookings History</strong></a></li>
                </ul>
                
                <div id="test1" class="col s12"><ProfileDetails/></div>
                <div id="test2" class="col s12"><BookingsHistory/></div>
            </div>
        );
    }
}

export default Profile;