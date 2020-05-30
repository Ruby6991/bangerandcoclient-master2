import React, { Component } from 'react'
import M from "materialize-css"
import BookingReceipt from './BookingReceipt'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { RangeDatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import 'moment/locale/ko';
import TimeKeeper from 'react-timekeeper';
import { Redirect } from "react-router-dom";
const axios = require("axios")

class Booking extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicleId:this.props.location.state.id,
            firstName:'',
            lastName:'',
            nic:'',
            age:'',
            phoneNo:'',
            selectedUtilities:[],
            pickupDate:'',
            pickupTime:'',
            returnDate:'',
            returnTime:'',
            pickupDateTime:'',
            dropDateTime:'',
            duration:'',
            utilities:[],
            imgUrl:'',
            model:'',
            rates:'',
            description:'',
            selectedFile:'',
            costs:[],
            isBookingComplete:false
        }
        this.toTimestamp = this.toTimestamp.bind(this);
        this.onPickTimeChange = this.onPickTimeChange.bind(this);
        this.onDropTimeChange = this.onDropTimeChange.bind(this);
        this.calculateCost = this.calculateCost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                let age="";
                if(data.dateOfBirth!==null){
                    let splitDate=data.dateOfBirth.toString().split("T");
                    let today = new Date();
                    let birthDate = new Date(splitDate[0]);
                    age = today.getFullYear() - birthDate.getFullYear();
                    let m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    console.log(age);
                }
                that.setState({
                    firstName:data.firstName,
                    lastName:data.lastName,
                    age:age,
                    phoneNo:data.phoneNo
                })
            }).catch(function(error){
                console.log(error);
            }) 

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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleCheckbox = (e) => {
        this.setState({
            selectedUtilities: [...this.state.selectedUtilities, e.target.name] 
        })
    }

    onDateChange = (startDate, endDate) => {
        this.setState({
            pickupDate: startDate,
            returnDate: endDate
        })
    }

    onPickTimeChange = (time) => {
        this.setState({
            pickupTime: time.formatted12
        })
      }

    onDropTimeChange = (time) => {
        this.setState({
            returnTime: time.formatted12
        })
    }

    toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    calculateCost(){
        let allCosts=[];
        let duration = this.state.duration;
        let vehicleCost = this.state.rates * duration;
        let utilities=this.state.selectedUtilities;
        let totalutilityCost=0;
        for (let i = 0; i < utilities.length; i++) {
            for(let a = 0; a< this.state.utilities.length; a++){
                if(utilities[i] === this.state.utilities[a].utilityName){
                    totalutilityCost = totalutilityCost + (this.state.utilities[a].utilityRate*duration);
                }
            }
        }
        
        let totalCost = vehicleCost + totalutilityCost ;
        allCosts.push(vehicleCost);
        allCosts.push(totalutilityCost);
        allCosts.push(totalCost);
        return allCosts;
    }
     
    convertTo24Hour(time) {
        var hours = parseInt(time.substr(0, 2));
        if(time.indexOf('am') != -1 && hours == 12) {
            time = time.replace('12', '0');
        }
        if(time.indexOf('pm')  != -1 && hours < 12) {
            time = time.replace(hours, (hours + 12));
        }
        return time.replace(/(am|pm)/, '');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }

        let splitPickUpDate=this.state.pickupDate.toISOString().split("T");
        let pickDate = new Date(splitPickUpDate[0]);
        pickDate.setDate(pickDate.getDate()+1);
        splitPickUpDate= pickDate.toISOString().split("T");
        var thePickdate = new Date(Date.parse(splitPickUpDate[0] + ' ' + this.convertTo24Hour(this.state.pickupTime)));

        let splitDropDate=this.state.returnDate.toISOString().split("T");
        let dropDate = new Date(splitDropDate[0]);
        dropDate.setDate(dropDate.getDate()+1);
        splitDropDate= dropDate.toISOString().split("T");
        var theReturndate = new Date(Date.parse(splitDropDate[0] + ' ' + this.convertTo24Hour(this.state.returnTime)));

        let numOfDays = Math.round((dropDate-pickDate)/(1000*60*60*24));

        this.setState({
            pickupDateTime:thePickdate,
            dropDateTime:theReturndate,
            duration:numOfDays }, () => {
                this.setState({
                    costs:this.calculateCost()
                }, () => {
                    const that = this;
                    const userdata = {
                        email:localStorage.email
                    }
            
                    const vehicleData = {
                        id:this.state.vehicleId
                    }
            
                    const data = {
                        user:userdata,
                        vehicle:vehicleData,
                        pickupDateTime: thePickdate,
                        dropDateTime:theReturndate,
                        selectedUtilities:this.state.selectedUtilities,
                        totalAmount:this.state.costs[2]
                    }
            
                    console.log(data);
            
                    axios.put("http://localhost:8080/CreateBooking",data,{
                        headers:headersInfo
                    })
                        .then(function(res){
                            console.log("Booking created successfully!");
                            alert("Booking created successfully!");
                            that.setState({
                                isBookingComplete:true
                            })
                        }).catch(function(error){
                            console.log("Booking creation un-successful!\nError : ",error);
                            alert("Booking creation un-successful!");
                     })
                })
                
          }); 


        const docInfo = {
            nic:this.state.nic
        }

        axios.put("http://localhost:8080/UpdateUserNIC/"+localStorage.email,docInfo,{
            headers:headersInfo
        })
            .then(function(res){
                console.log("NIC updated successfully!");
            }).catch(function(error){
                console.log("NIC update un-successful!\nError : ",error.response);
         })

        console.log(this.state);
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        formData.append('userId', localStorage.email);
        axios.post("http://localhost:8080/doc/upload", formData,{
            headers:headersInfo
        })
            .then(res => {
                console.log(res.data);
                alert("File uploaded successfully.")
            }).catch(function(error){
                console.log("Error : ",error);
                alert("File upload un-successful!");
         })
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        });
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <Navbar/>
                {
                   this.state.isBookingComplete?(
                       <Redirect to={{
                            state: {selectedUtilities:this.state.selectedUtilities,
                                    pickupDateTime:this.state.pickupDateTime,
                                    dropDateTime:this.state.dropDateTime,
                                    model:this.state.model,
                                    costs:this.state.costs },
                            pathname: '/bookingReceipt'
                          }}/>
                   ):("")
                }
                <div className="booking-details">
                    <form>
                        <h1>Start Reservation</h1>
                        <div className="field-sets">
                            <fieldset>
                                <legend><span class="number">1</span> Reservation Details </legend>
                                <div className="row-info">
                                    <div className="row">
                                        <label for="pickupDate">Date</label>
                                        <RangeDatePicker locale="ko" onChange={this.onDateChange}/>
                                    </div>
                                </div>
                                <div className="row-info">
                                    <div className="row">
                                        <label for="pickupTime">Pick-up Time</label>
                                        <TimeKeeper
                                            onChange={this.onPickTimeChange}
                                        />
                                    </div>
                                    <div className="row">
                                        <label for="pickupTime">Return Time</label>
                                        <TimeKeeper
                                            onChange={this.onDropTimeChange}
                                        />
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
                                    { this.state.utilities && this.state.utilities.map(utility => 
                                        {
                                            return(
                                                <tr className="table-row">
                                                    <td><img class="responsive-img" src={utility.utilityImg} alt=""/></td>
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
                                        <input id="firstName" name="first_name" value={this.state.age} type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label for="phoneNumber">Phone Number</label>
                                        <input id="phoneNumber" name="phone_number" type="tel" value={this.state.phoneNo} class="validate"  onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <label for="nicNumber">NIC</label>
                                <input type="text" id="nic" name="nic_number" placeholder="NIC " onChange={this.handleChange}/>
                                <label for="nic-upload">Upload Scanned Copy of NIC</label>
                                <div id="nic-upload" class="file-field input-field">
                                    <div id="upload-btn" class="btn-flat">
                                        <span>Upload</span>
                                        {/* <input type="file"/> */}
                                        <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text"/>
                                    </div>
                                </div>
                                {/* <div class="card">
                                    <div class="card-content">
                                        <span class="card-title"><button id="edit-btn" onClick={this.handleCalculate}>Calculate Total Cost</button></span>
                                        <table >
                                            <tbody>
                                                <tr>
                                                    <th>Vehicle Cost : </th>
                                                    <td>{this.state.costs[0]}</td>
                                                </tr>
                                                <tr>
                                                    <th>Utilities Cost : </th>
                                                    <td>{this.state.costs[1]}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Amount : </th>
                                                    <td>{this.state.costs[2]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}

                            </fieldset>
                        </div>
                        <button className="reserve-btn" type="submit" onClick={this.handleSubmit}>Complete Your Booking</button>
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Booking;