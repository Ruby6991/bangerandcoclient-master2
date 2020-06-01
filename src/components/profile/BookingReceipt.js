import React, { Component } from 'react'
import Moment from 'react-moment';
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import M from "materialize-css"
import { Redirect } from "react-router-dom";
const axios = require("axios")

class BookingReceipt extends Component {

    constructor(props){
        super(props);
        if(props.location === undefined){
            let utilities = this.props.booking.utilities;
            let selectedUtils = [];
            for (let i = 0; i < utilities.length; i++) {
                selectedUtils.push(utilities[i].utilityName);
            }
            this.state={
                selectedUtilities:selectedUtils,
                pickupDateTime:this.props.booking.pickupDateTime,
                dropDateTime:this.props.booking.dropDateTime,
                model:this.props.booking.vehicle.model,
                costs:this.props.booking.totalAmount,
                isHistory:true,
                bookingID:this.props.booking.id,
                status:this.props.booking.bookingState,
                isEdit:false
            }
        }else{
            this.state={
                selectedUtilities:props.location.state.selectedUtilities,
                pickupDateTime:props.location.state.pickupDateTime,
                dropDateTime:props.location.state.dropDateTime,
                model:props.location.state.model,
                costs:props.location.state.costs,
                isHistory:false,
                bookingID:'',
                status:"pending"
            }
        }
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }

        const data = {
            email:localStorage.email
        }

        axios.post("http://localhost:8080/GetUtilityList",data,config)
        .then(function(res){
            console.log(res.data);
            that.setState({
                utilities:res.data
            })
        }).catch(function(error){
            console.log(error.response);
        })
    }

    handleEdit(){
        this.setState({
            isEdit:true
        })
    }

    render(){
        return (
            <div>
                {
                   this.state.isEdit?(
                    <Redirect to={{
                            state: {bookingId:this.state.bookingID,
                                    model:this.state.model},
                            pathname: '/editBooking'
                          }}/>
                   ):("")
                }
                {
                this.state.isHistory?(
                    ""
                ):(
                    <Navbar/>)
                }
                <div className="booking-receipt">
                    <div class="card">
                        <div class="card-content">
                            {
                            this.state.isHistory?(
                                <span class="card-title">Booking ID: {this.state.bookingID} </span>
                            ):(
                                <span class="card-title">Booking Summary </span>)
                            }
                            
                            <table >
                                <tbody>
                                <tr>
                                    <th>Vehicle</th>
                                    <td>{this.state.model}</td>
                                </tr>
                                <tr>
                                    <th>Pick-up Date</th>
                                    <td><Moment>{this.state.pickupDateTime}</Moment></td>
                                </tr>
                                <tr>
                                    <th>Return Date</th>
                                    <td><Moment>{this.state.dropDateTime}</Moment></td>
                                </tr>
                                <tr>
                                    <th>Additional Utilities</th>
                                    <td>
                                        {
                                        this.state.selectedUtilities.length>0?(
                                            this.state.selectedUtilities.map(utility => 
                                                {
                                                    return(
                                                        utility + " | "
                                                    )
                                                })
                                        ):(
                                            "None Selected"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Booking Status</th>
                                    <th>{this.state.status}</th>
                                </tr>
                                {
                                this.state.isHistory?(
                                        <tr>
                                            <th>Estimated Total</th>
                                            <th>{this.state.costs}</th>
                                        </tr>
                                ):(
                                        <tr>
                                            <th>Cost</th>
                                            <td><b>Vehicle Cost : </b>{this.state.costs[0]}<br/><br/>
                                                <b>Utility Cost : </b>{this.state.costs[1]}<br/><br/>
                                                <b>Estimated Total : </b>{this.state.costs[2]}
                                            </td>
                                        </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div class="card-action">
                            <button id="edit-btn" onClick={this.handleEdit}>Edit</button>
                        </div>
                    </div>
                </div>
                {
                this.state.isHistory?(
                    ""
                ):(
                    <Footer/>)
                }
            </div>
        )
    }
    
}

export default BookingReceipt;
