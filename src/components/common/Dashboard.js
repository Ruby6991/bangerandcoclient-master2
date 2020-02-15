import React, { Component } from 'react';
import M from "materialize-css";
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

class Dashboard extends Component {
    componentDidMount(){
        const parallax=document.querySelectorAll('.parallax');
        M.Parallax.init(parallax,{}); 

        const datepicker=document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker,{});
        
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="dashboard">
                    <div class="parallax-container">
                        <div class="parallax"><img src="https://images.unsplash.com/photo-1511527844068-006b95d162c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></div>
                    </div>
                    <div className="about-us">
                        <h1>Banger & Co Vehicle Rental Service</h1>
                        <p>We offer car rentals, 
                            as well as car sharing and car sales. Banger & Co is now a household name for frequent travelers, road trippers 
                            and those with a car in the shop. We're a brand that’s recognized as an islandwide leader in the car rental industry. 
                            We value employees and customers as much as a member of the family. Today Banger & Co continues to drive success 
                            through a simple, yet powerful set of beliefs to become a leader in car rental, serving all of your transportation
                            needs.</p>
                    </div>
                    <div class="parallax-container">
                        <div class="parallax"><img src="https://images.unsplash.com/photo-1531181616225-f8e50c1ab53e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></div>
                    </div>
                    <div className="start-reservation">
                        <h1>Start a Reservation</h1>
                        <div className="search-form">
                            <input placeholder="Pick-up Date" type="text" class="datepicker" id="pickup-date"/>
                            <input placeholder="Drop-off Date" type="text" class="datepicker" id="dropoff-date"/>
                            <button className="search-btn" type="submit" name="action">Search</button>
                        </div>
                    </div>
                    <div class="parallax-container">
                        <div class="parallax"><img src="https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/></div>
                    </div>
                    <div className="about-us">
                        <h1>Services</h1>
                        <p>Our services are tailor-made to meet any type of transportation service you require. Whether you need a 
                            vehicle for a few hours, a day, or longer, Banger & Co has you covered.</p>
                        <ul>
                            <li>Online Bookings <i class="large material-icons">airport_shuttle</i></li>
                            <li>Additional Utilities  <i class="large material-icons">usb</i></li>
                            <li>Extend Rentals<i class="large material-icons">update</i></li>
                        </ul>
                    </div>
                    <div class="parallax-container">
                        <div class="parallax"><img src="https://images.unsplash.com/photo-1511362483461-8795ba551506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/></div>
                    </div>
                    <div className="about-us">
                        <h1>Vehicle Fleet</h1>
                        <p>We offer a wide range of options from economy to luxury. 
                            The fleet consists of cars, sports utility, and 4WD vehicles and vans. From SUVs to pickup trucks, 
                            wherever you go, we’ve got your ride.</p>
                    </div>
                    <div class="parallax-container">
                        <div class="parallax"><img src="https://images.unsplash.com/photo-1532931899774-fbd4de0008fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/></div>
                    </div>
                    <div className="about-us">
                        <h1>Start planning your ride with Banger & Co</h1>
                    </div>
                    <div class="parallax-container">
                        <div class="parallax"><img src="https://images.unsplash.com/photo-1484898825481-73250f5eab5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"/></div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;