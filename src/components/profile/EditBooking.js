import React, { Component } from 'react'
import M from "materialize-css"
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { Redirect } from "react-router-dom";
import Moment from 'react-moment';
const axios = require("axios")

class EditBooking extends Component {
    constructor(props){
        super(props);
        this.state={
            bookingId:this.props.location.state.bookingId,
            vehicleId:'',
            duration:'',
            selectedUtilities:[],
            newlySelectedUtils:[],
            pickupDateTime:'',
            dropDateTime:'',
            model:this.props.location.state.model,
            costs:'',
            status:'',
            utilities:[],
            isUpdateComplete:false,
            isUserReturning:false,
            lateState:false,
            isExtended:false,
            vehicleBookings:[]
        }
        this.calculateCost = this.calculateCost.bind(this);
        this.handleLateReturn = this.handleLateReturn.bind(this);
        this.handleExtendBooking = this.handleExtendBooking.bind(this);
        this.addNewUtils = this.addNewUtils.bind(this);
    }
    

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

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

        axios.get("http://localhost:8080/GetBooking/"+this.state.bookingId, config)
        .then(function(res){
            console.log(res.data);
            that.setState({
                selectedUtilities:res.data.utilities,
                pickupDateTime:res.data.pickupDateTime,
                dropDateTime:res.data.dropDateTime,
                costs:res.data.totalAmount,
                status:res.data.bookingState,
                lateState:res.data.lateState,
                vehicleId:res.data.vehicle.id
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    handleCheckbox = (e) => {
        this.setState({
            newlySelectedUtils:[...this.state.newlySelectedUtils, e.target.name]
            })
    }

    calculateCost(){
        var thePickdate = this.state.pickupDateTime;
        var theReturndate = this.state.dropDateTime;

        var pickDate= new Date(thePickdate.split("T")[0]);
        var dropDate= new Date(theReturndate.split("T")[0]);


        let numOfDays = Math.round((dropDate-pickDate)/(1000*60*60*24));

        let diff;
        if(numOfDays<1){
            diff = Math.abs(theReturndate.getTime() - thePickdate.getTime()) / 3600000;
            numOfDays=diff+' hours';
        }

        if(typeof numOfDays==="string"){
            let hours = numOfDays.split(' ');
            if(hours[0]>5){
                numOfDays=1;
            }else{
                numOfDays=0.5;
            }
        }

        let newUtils=this.state.newlySelectedUtils;
        let totalutilityCost=0;
        for (let i = 0; i < newUtils.length; i++) {
            for(let a = 0; a< this.state.utilities.length; a++){
                if(newUtils[i] === this.state.utilities[a].utilityName){
                    totalutilityCost = totalutilityCost + (this.state.utilities[a].utilityRate*numOfDays);
                }
            }
        }
        
        let totalCost = this.state.costs + totalutilityCost ;
        return totalCost;
    }

    handleLateReturn = (e) => {
        e.preventDefault();

        if(this.state.lateState){
            alert("This Booking has Already Been Marked as A Late Return.");
            return;
        }

        const that = this;
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const userData = {
            email:localStorage.email
        }
        axios.post("http://localhost:8080/GetUser",userData,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            let customerState = res.data.customerState;
            if(customerState.localeCompare("Returning")===0){
                that.setState({
                    isUserReturning:true,
                    lateState:true}, () => {       
                        const bookingData = {
                            lateState:true
                        }             
                           
                        axios.put("http://localhost:8080/updateLateReturn/"+that.state.bookingId, bookingData, {
                            headers:headersInfo
                        })
                            .then(function(res){
                                console.log("Late Return Confirmed!");
                                alert("Late Return Confirmed! You can Return the Vehicle After 6.00 p.m. on the Return Date");
                            }).catch(function(error){
                                console.log("Late Return Request un-successful!\nError : ",error.response);
                                alert("Late Return Request un-successful!");
                        })
                    })
            }else{
                alert("Sorry. Only Returning Customers Can Request for Late Returns");
            }
        }).catch(function(error){
            console.log(error);
        })

    }

    handleExtendBooking= (e) => {
        e.preventDefault();

        // if(this.state.isExtended){
        //     alert("This Booking has Already Been Extended.");
        //     return;
        // }

        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }

        axios.get("http://localhost:8080/GetVehicleBookings/"+ this.state.vehicleId, config)
        .then(function(res){
                console.log(res.data)
                that.setState({
                    vehicleBookings:res.data}, () => {
                        let canExtend = true;
                        const bookings = that.state.vehicleBookings;
                        var nextDate = new Date(that.state.dropDateTime.split("T")[0]);
                        nextDate.setDate(nextDate.getDate() + 1);
                        for(let a=0; a<bookings.length;a++){
                            let startDate=bookings[a].pickupDateTime.split("T");
                            let includeStart = new Date(startDate[0]);
                            includeStart.setDate(includeStart.getDate());
                            console.log(includeStart.getTime()===nextDate.getTime());
                            if(includeStart.getTime()===nextDate.getTime()){
                                canExtend=false;
                            }
                        }

                        if(canExtend){
                            that.setState({
                                isExtended:true}, () => {
                                    const bookingData = {
                                        extendedState:true
                                    }
                                    axios.put("http://localhost:8080/extendBooking/"+that.state.bookingId, bookingData, config)
                                            .then(function(res){
                                                console.log("Extension Confirmed!");
                                                alert("Extension Confirmed! Please return the vehicle on or before 4.00 p.m. Today.");
                                            }).catch(function(error){
                                                console.log("Extension Request un-successful!\nError : ",error.response);
                                                alert("Extension Request un-successful!");
                                        })
                                })
                        }else{
                            alert("Sorry. The extension request was declined due to a Booking Made for Tomorrow");
                        }
                    })
                console.log("Vehicle Bookings Received!");
            }).catch(function(error){
                console.log("Vehicle Bookings error ",error.response);
            }) 

    }

    addNewUtils = (e) => {
        e.preventDefault();

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }

        const that = this;

        const selectedUtils = [];

        for(let b=0; b<this.state.selectedUtilities.length;b++){
            const oldData = {
                id:this.state.selectedUtilities[b].id
            }
            selectedUtils.push(oldData);
        }

        for (let i = 0; i < this.state.newlySelectedUtils.length; i++) {
            for(let a = 0; a< this.state.utilities.length; a++){
                if(this.state.newlySelectedUtils[i] === this.state.utilities[a].utilityName){
                    const newData = {
                        id:this.state.utilities[a].id
                    }
                    selectedUtils.push(newData);
                }
            }
        }

        const data = {
            utilities:selectedUtils,
            totalAmount:this.calculateCost()
        }

        console.log(data);

        if(this.state.newlySelectedUtils!==[]){
            axios.put("http://localhost:8080/addNewUtils/"+this.state.bookingId, data,{
            headers:headersInfo
            })
                .then(function(res){
                    console.log("Booking updated successfully!");
                    alert("Booking updated successfully!");
                    that.setState({
                        isUpdateComplete:true
                    })
                }).catch(function(error){
                    console.log("Booking update un-successful!\nError : ",error.response);
                    alert("Booking update un-successful!");
            })
        }else{
            alert("Please select a new utility");
        } 
                     

    }

    render() {
        return (
            <div>
                <Navbar/>
                {
                   this.state.isUpdateComplete?(
                       <Redirect to={'/account'}/>
                   ):("")
                }
                <div className="booking-details">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Edit Booking </span>
                            <div class="row">

                                <div class="col s3">
                                {
                                this.state.isExtended?(
                                    ""
                                ):(
                                    <button onClick={this.handleExtendBooking}>Extend Booking</button>)
                                }
                                {
                                this.state.lateState?(
                                    ""
                                ):(
                                    <button onClick={this.handleLateReturn}>Mark Late Return</button>)
                                }
                                    
                                    <button >Cancel Booking</button>
                                </div>
                                <div class="col s9">
                                    <table >
                                        <tbody>
                                        <tr>
                                            <th>Booking ID</th>
                                            <td>{this.state.bookingId}</td>
                                        </tr>
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
                                                                utility.utilityName + " | "
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
                                        <tr>
                                            <th>Estimated Total</th>
                                            <th>{this.state.costs}</th>
                                        </tr>
                                    
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <form>
                                <legend>Add New Utilities</legend>
                                <table >
                                    <tbody>
                                    { this.state.utilities && this.state.utilities.map(utility => 
                                        {
                                            return(
                                                <tr className="table-row">
                                                    <td>{utility.utilityName}</td>
                                                    <td>Rs.{utility.utilityRate}/hr</td>
                                                    <td>
                                                        <label>
                                                            <input name={utility.utilityName} type="checkbox" onChange={this.handleCheckbox} />
                                                            <span></span>
                                                        </label>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <button className="edit-btn" type="button" onClick={this.addNewUtils}>Update Booking</button>
                            </form>
                        </div>   
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default EditBooking;