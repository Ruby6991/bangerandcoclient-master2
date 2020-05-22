import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { Redirect } from "react-router-dom"
const axios = require("axios")

class VehicleDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.location.state.id,
            imgUrl:'',
            model:'',
            rates:'',
            fuelType:'',
            avaialability:'',
            description:'',
            vehicle:''
        }
        this.createBooking = this.createBooking.bind(this);
    }

    componentDidMount() {
        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        console.log(this.state);
        axios.get("http://localhost:8080/GetVehicle/"+ this.state.id, config)
        .then(function(res){
                console.log(res.data)
                that.setState({
                    imgUrl:res.data.imgUrl,
                    model:res.data.model,
                    rates:res.data.rates,
                    fuelType:res.data.fuelType,
                    availability:res.data.availability,
                    description:res.data.description,
                    startBooking:false
                })
                console.log("Vehicle Data Received!");
            }).catch(function(error){
                console.log("Vehicle data error ",error.response);
            }) 
    }

    createBooking(){
        this.setState({
            startBooking:true
        })
    }

    render() {
        return (
            <div>
                 {
                    this.state.startBooking?(
                        <Redirect to={{
                            state: { id: this.state.id },
                            pathname: '/booking'
                          }}/>
                    ):("")
                }
                <Navbar/>
                <div className="vehicle-details">
                    <div class="card">
                        <div class="card-image">
                            <img src={this.state.imgUrl} alt=""/>
                            <span class="card-title">{this.state.model}</span>
                        </div>
                        <div class="card-content">
                            <div className="details">
                                <p><strong>Model :</strong>  {this.state.model} </p>
                                <p><strong> Rates:</strong>  {this.state.rates} Per Day</p>
                                <p><strong>Fuel Type:</strong> {this.state.fuelType}</p>
                                <p><strong>Availability :</strong> {this.state.availability?("Available"):("Unavailable")}</p>
                            </div><br/>
                            <p>{this.state.description}</p>
                        </div>
                        <div class="card-action">
                            <button onClick={this.createBooking} >Start A Reservation</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default VehicleDetails;
