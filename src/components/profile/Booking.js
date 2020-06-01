import React, { Component } from 'react'
import M from "materialize-css"
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
            category:'',
            model:'',
            rates:'',
            description:'',
            selectedFile:'',
            costs:[],
            document:'',
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
                    description:res.data.description,
                    category:res.data.category
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
                    phoneNo:data.phoneNo,
                    nic:data.nic
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

        axios.get("http://localhost:8080/doc/getDocument/"+localStorage.email,config)
        .then(function(res){
            // console.log(res.data);
            that.setState({
                document:res.data
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

        if(typeof duration==="string"){
            let hours = duration.split(' ');
            if(hours[0]>5){
                duration=1;
            }else{
                duration=0.5;
            }
        }
        
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

        if(this.state.age<25 && (this.state.category==='Family Vehicles' || this.state.category==='Vans')){
            alert("Sorry. Users under 25 can only book Small Town Cars");
            return;
        }

        if(this.state.pickupDate==='' || this.state.returnDate===''){
            alert("Please Fill in the Pick up and Drop Off Dates!");
            return;
        }

        console.log();
        let pickTime=this.convertTo24Hour(this.state.pickupTime).split(":");
        let dropTime=this.convertTo24Hour(this.state.returnTime).split(":");

        if(pickTime[0]<8 || pickTime[0]>18){
            alert("Please Pick a Pick-up Time between 8.00 a.m. and 6.00 p.m.");
            return;
        }else if(dropTime[0]<8 || dropTime[0]>18){
            alert("Please Pick a Drop-off Time between 8.00 a.m. and 6.00 p.m.");
            return;
        }

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }

        if(this.state.document===''){
            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            formData.append('userId', localStorage.email);
            axios.post("http://localhost:8080/doc/upload", formData,{
                headers:headersInfo
            })
                .then(res => {
                    console.log(res.data);
                    console.log("Document uploaded successfully.");
                }).catch(function(error){
                    console.log("Error : ",error);
                    console.log("Document Upload Failed");
            })
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

        let diff;
        if(numOfDays<1){
            diff = Math.abs(theReturndate.getTime() - thePickdate.getTime()) / 3600000;
            numOfDays=diff+' hours';
        }

        if(diff<=4){
            alert("Sorry. You Cannot make a booking for less than 5 Hours.");
            return;
        }else if(numOfDays>14){
            alert("Sorry. You Cannot make a booking for more than 2 weeks.");
            return;
        }

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

                    const selectedUtils = [];

                    for (let i = 0; i < this.state.selectedUtilities.length; i++) {
                        for(let a = 0; a< this.state.utilities.length; a++){
                            if(this.state.selectedUtilities[i] === this.state.utilities[a].utilityName){
                                const utilityData = {
                                    id:this.state.utilities[a].id
                                }
                                selectedUtils.push(utilityData);
                            }
                        }
                    }
            
                    const data = {
                        user:userdata,
                        vehicle:vehicleData,
                        pickupDateTime: thePickdate,
                        dropDateTime:theReturndate,
                        utilities:selectedUtils,
                        totalAmount:this.state.costs[2]
                    }
            
                    console.log(data);
            
                    if(this.state.document!=='' || this.state.selectedFile!==''){
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
                                console.log("Booking creation un-successful!\nError : ",error.response);
                                alert("Booking creation un-successful!");
                        })
                    }else{
                        alert("Please upload a scanned copy of your NIC to create a Booking");
                    } 
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
                                        <label>Pick-up and Drop-off Dates</label>
                                        <RangeDatePicker 
                                        locale="ko" 
                                        disableDay={
                                            [
                                                new Date(2020, 6, 12),
                                                new Date(2020, 6, 2)
                                            ]
                                        } 
                                        onChange={this.onDateChange}
                                        />
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
                                        <input id="age" name="age" value={this.state.age || ''} type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label for="phoneNumber">Phone Number</label>
                                        <input id="phoneNumber" name="phone_number" type="tel" value={this.state.phoneNo} class="validate"  onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <label for="nicNumber">NIC</label>
                                <input type="text" id="nic" name="nic_number" value={this.state.nic} placeholder="NIC " onChange={this.handleChange}/>
                                
                                {
                                    this.state.document===''?(
                                        <div>
                                            <label for="nic-upload">Upload Scanned Copy of NIC/ Driver's License</label>
                                            <div id="nic-upload" class="file-field input-field">
                                                <div id="upload-btn" class="btn-flat">
                                                    <span>Upload</span>
                                                    <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                                                </div>
                                                <div class="file-path-wrapper">
                                                    <input class="file-path validate" type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                    ):("")
                                }
                            </fieldset>
                        </div>
                        <button className="reserve-btn" type="button" onClick={this.handleSubmit}>Complete Your Booking</button>
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Booking;