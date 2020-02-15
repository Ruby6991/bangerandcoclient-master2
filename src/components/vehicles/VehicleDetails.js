import React, { Component } from 'react';
import M from "materialize-css";
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

class VehicleDetails extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="vehicle-details">
                    <div class="card">
                        <div class="card-image">
                            <img src="https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=767&q=80"/>
                            <span class="card-title">Vehicle Name</span>
                        </div>
                        <div class="card-content">
                            <div className="details">
                                <p><strong>Model :</strong>  XYZ </p>
                                <p><strong> Rates:</strong>  123</p>
                                <p><strong>Fuel Type:</strong> Hybrid</p>
                                <p><strong>Availability :</strong> Available</p>
                            </div><br/>
                            <p>I am a very simple vehicle description. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                            <button>Start A Reservation</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default VehicleDetails;
