import React, { Component } from 'react'
import M from "materialize-css"
import BookingReceipt from './BookingReceipt'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
const axios = require("axios")

class Booking extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicleId:this.props.location.state.id,
            firstName:'',
            lastName:'',
            age:'',
            phoneNo:'',
            bookingID:'',
            pickupDate:'',
            pickupTime:'',
            returnDate:'',
            returnTime:'',
            utilities:[],
            city:'',
            imgUrl:'',
            model:'',
            rates:'',
            description:''
        }
    }

    componentDidMount(){
        const datepicker=document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker,{});

        const timepicker = document.querySelectorAll('.timepicker');
        M.Timepicker.init(timepicker,{});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        console.log(this.state);
        axios.get("http://localhost:8080/GetVehicle/"+ this.state.vehicleId, config)
        .then(function(res){
                console.log(res.data)
                that.setState({
                    imgUrl:res.data.imgUrl,
                    model:res.data.model,
                    rates:res.data.rates,
                    description:res.data.description
                })
                console.log("Vehicle Data Received!");
            }).catch(function(error){
                console.log("Vehicle data error ",error.response);
            }) 

        const data = {
            email:localStorage.email
        }
        axios.post("http://localhost:8080/GetUser",data,config)
        .then(function(res){
            console.log(res.data);
            const data = res.data;
            let dob="";
            if(data.dateOfBirth!==null){
                let splitDate=data.dateOfBirth.toString().split("T");
                dob = new Date(splitDate[0]);
                // dob.setDate(dob.getDate()+1);
                // splitDate= dob.toISOString().split("T");
                // dob=splitDate[0];
                // console.log(dob);
                dob= Math.floor((new Date() - new Date(splitDate[0]).getTime()));
            }
            that.setState({
                firstName:data.firstName,
                lastName:data.lastName,
                age:dob,
                phoneNo:data.phoneNo
            })
        }).catch(function(error){
            console.log(error);
            if(error.response.status===401){
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                localStorage.removeItem("name");
                that.setState({
                    redirectToHome:true
                })
            }
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        
        const data = {
            userID:localStorage.email,
            vehicleId:this.state.vehicleId,
            pickupDate:this.state.pickupDate,
            pickupTime:this.state.pickupTime,
            returnDate:this.state.returnDate,
            returnTime:this.state.returnTime,
            utilities:this.state.utilities,
            city:this.state.city
        }
        console.log(data);

        axios.put("http://localhost:8080/CreateBooking",data,{
            headers:headersInfo
        })
            .then(function(res){
                console.log("Booking created successfully!");
                alert("Booking created successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("Booking creation un-successful!\nError : ",error.response);
                alert("Booking creation un-successful!");
         })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="booking-details">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Start Reservation</h1>
                        <div className="field-sets">
                            <fieldset>
                                <legend><span class="number">1</span> Reservation Details </legend>
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
                                        <img src={this.state.imgUrl} alt=""/>
                                        <span class="card-title">{this.state.model}<br/>{this.state.rates+" Per Day"}</span>
                                        
                                    </div>
                                    <div class="card-content">
                                        <p>{this.state.description}</p>
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
                                        <input id="firstName" name="first_name" value={this.state.firstName} type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label for="lastName">Last Name</label>
                                        <input id="lastName" name="last_name" value={this.state.lastName} type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row-info">
                                    <div className="row">
                                        <label for="age">Age</label>
                                        <input id="firstName" name="first_name" value={this.state.firstName} type="text" class="validate" onChange={this.handleChange}/>
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
                <Footer/>
            </div>
        );
    }
}

export default Booking;