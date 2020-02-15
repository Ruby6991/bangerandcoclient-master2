import React, { Component } from 'react';
import M from "materialize-css";
import BookingReceipt from './BookingReceipt';

class Booking extends Component {
    state = {
        bookingID:'',
        pickupDate:'',
        pickupTime:'',
        returnDate:'',
        returnTime:'',
        selectedVehicle:'',
        utilities:'',
        city:''
    }

    componentDidMount(){
        const datepicker=document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker,{});

        const timepicker = document.querySelectorAll('.timepicker');
        M.Timepicker.init(timepicker,{});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
           <div className="booking-details">
           <form onSubmit={this.handleSubmit}>
                    <h1>Start Reservation</h1>
                    <div className="field-sets">
                        <fieldset>
                            <legend><span class="number">1</span> Reservation Details</legend>
                            <div className="row-info">
                                <div className="row">
                                    <label for="pickupDate">Pick-up Date</label>
                                    <input type="text" id="pickupDate" name="pickup_date" placeholder="Pick-up Date" class="datepicker" onChange={this.handleChange}/>
                                </div>
                                <div className="row">
                                    <label for="pickupTime">Pick-up Time</label>
                                    <input type="text" id=" pickupTime" name="pickup_time" placeholder="Pick-up Time" class="timepicker" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row-info">
                                <div className="row">
                                    <label for="returnDate">Return Date</label>
                                    <input type="text" id="returnDate" name="return_date" placeholder="Return Date" class="datepicker" onChange={this.handleChange}/>
                                </div>
                                <div className="row">
                                    <label for="returnTime">Return Time</label>
                                    <input type="text" id="returnTime" name="return_time" placeholder="Return Time" class="timepicker" onChange={this.handleChange}/>
                                </div>
                            </div>
                            
                            <legend><span class="number">2</span>Selected Vehicle Details</legend>
                            <div class="card">
                                <div class="card-image">
                                    <img src="https://images.unsplash.com/photo-1556448851-9359658faa54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                                    <span class="card-title">Card Title</span>
                                </div>
                                <div class="card-content">
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div class="card-action">
                                    <button>Change Vehicle</button>
                                </div>
                            </div> 

                            <legend><span class="number">3</span> Additional Utilities Details</legend>
                            <table >
                                <tbody>
                                <tr className="table-row">
                                    <td><img class="responsive-img" src="https://www.teslarati.com/wp-content/uploads/2018/10/nav-on-autopilot.jpg"/></td>
                                    <td>GPS</td>
                                    <td>Rs.500/hr</td>
                                    <td>
                                        <label>
                                            <input type="checkbox" />
                                            <span></span>
                                        </label>
                                    </td>
                                </tr>
                                <tr className="table-row">
                                    <td><img class="responsive-img" src="https://peopledotcom.files.wordpress.com/2019/05/car-seat-2.jpg" /></td>
                                    <td>CarSeat</td>
                                    <td>Rs.1500/hr</td>
                                    <td>
                                        <label>
                                            <input type="checkbox" />
                                            <span></span>
                                        </label>
                                    </td>
                                </tr>
                                <tr className="table-row">
                                    <td><img class="responsive-img" src="https://performancedrive.com.au/wp-content/uploads/2018/07/Rolls-Royce-Cullinan-Australia-champagne-cooler.jpg"/></td>
                                    <td>Wine Chillers</td>
                                    <td>Rs.5490/hr</td>
                                    <td>
                                        <label>
                                            <input type="checkbox" />
                                            <span></span>
                                        </label>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <legend><span class="number">4</span> Renter Details</legend>
                            <div className="row-info">
                                <div className="row">
                                    <label for="firstName">First Name</label>
                                    <input id="firstName" name="first_name" placeholder="First Name" type="text" class="validate" onChange={this.handleChange}/>
                                </div>
                                <div className="row">
                                    <label for="lastName">Last Name</label>
                                    <input id="lastName" name="last_name" placeholder="Last Name" type="text" class="validate" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row-info">
                                <div className="row">
                                    <label for="ageGroup">Age</label>
                                    <select id="ageGroup">
                                        <option value="" disabled selected>Choose your age</option>
                                        <option value="1">Below 25</option>
                                        <option value="2">Above 25</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input id="phoneNumber" name="phone_number" type="tel" placeholder="Phone Number" class="validate"  onChange={this.handleChange}/>
                                </div>
                            </div>
                            <label for="nicNumber">NIC</label>
                            <input type="text" id="nicNumber" name="nic_number" placeholder="NIC " onChange={this.handleChange}/>
                            <label for="nic-upload">Upload Scanned Copy of NIC</label>
                            <div id="nic-upload" class="file-field input-field">
                                <div id="upload-btn" class="btn-flat">
                                    <span>Upload</span>
                                    <input type="file"/>
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text"/>
                                </div>
                            </div>
                            <h4>Booking Summary</h4>
                            <BookingReceipt/>
                            
                        </fieldset>
                    </div>
                    <button className="reserve-btn" type="submit">Complete Your Booking</button>
                </form>
            </div>
        );
    }
}

export default Booking;