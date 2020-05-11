import React, { Component } from 'react';
import M from "materialize-css";
import {Redirect} from 'react-router-dom';
const axios = require("axios");


class ProfileDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            // email:'',
            dateOfBirth:'',
            phoneNo:'',
            address:'',
            redirectToHome:false
        }
    }

    componentDidMount(){
        const datepicker=document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker,{
            selectMonths: true, 
            selectYears: 100, 
            format: "yyyy-mm-dd",
            setDefaultDate: true,
            onSelect: function(date) {
                var splitDate = date.toString().split("-"),
                    newdate = splitDate[0].split(" "),
                    editedDate = newdate[1]+"-"+newdate[2]+'-'+newdate[3],
                    finalDate = new Date(editedDate);
                that.setState({
                    dateOfBirth : finalDate
                })
              }
        });
        
        const that = this;
        console.log(localStorage);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            email:localStorage.email
        }
        axios.post("http://localhost:8080/GetUser",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            const data = res.data;
            let dob="";
            if(data.dateOfBirth!==null){
                let splitDate=data.dateOfBirth.toString().split("T");
                dob = new Date(splitDate[0]);
                dob.setDate(dob.getDate()+1);
                splitDate= dob.toISOString().split("T");
                dob=splitDate[0];
                console.log(dob);
            }
            that.setState({
                firstName:data.firstName,
                lastName:data.lastName,
                // email:data.email,
                dateOfBirth:dob,
                phoneNo:data.phoneNo,
                address:data.address,
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
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        const data = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            // email:this.state.email,
            dateOfBirth:this.state.dateOfBirth,
            phoneNo:this.state.phoneNo,
            address:this.state.address
        }
        console.log(data);

        axios.put("http://localhost:8080/UpdateUser/"+localStorage.email,data,config)
            .then(function(res){
                localStorage.setItem("firstName",(data.firstName));
                console.log("Profile updated successfully!");
                alert("Profile updated successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("Profile update un-successful!\nError : ",error.response);
                alert("Profile update un-successful!");
         })
    }

    handleDelete() {
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        if (window.confirm("Are you sure you want to delete your account?")) {
            axios.delete("http://localhost:8080/DeleteUser/"+localStorage.email,config)
            .then(function(res){
                console.log("Profile deleted successfully!");
                alert("Profile deleted successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("Profile delete un-successful!\nError : ",error.response);
                alert("Profile delete un-successful!");
        })
          } else {
            alert("Account deletion cancelled");
          }          
        
    }

    render() {
        return (
            <div className="profile-details">
                {
                    this.state.redirectToHome?(
                        <Redirect to="/"/>
                    ):("")
                }
                 <form>
                    <h1>Update Account</h1>
                    <div className="field-sets">
                        <fieldset>
                            <legend><span class="number">1</span> Your basic info</legend>
                            <label class="active" for="firstname">First Name</label>
                            <input type="text" id="firstName" name="user_fname" placeholder={this.state.firstName}  onChange={this.handleChange}/>
                            <label class="active" for="lastname">Last Name</label>
                            <input type="text" id="lastName" name="user_lname" placeholder={this.state.lastName}  onChange={this.handleChange}/>
                            {/* <label class="active" for="email">Email</label>
                            <input type="email" id="email" name="user_email" placeholder={this.state.email} onChange={this.handleChange}/> */}
                            <label class="active" for="dateOfBirth">Date of Birth</label>
                            <input type="text" class="datepicker" id="dateOfBirth" name="date_of_birth" placeholder={this.state.dateOfBirth} onChange={this.handleChange}/>
                            <label class="active" for="phoneNo">Phone Number</label>
                            <input type="tel" id="phoneNo" name="phone_no" placeholder={this.state.phoneNo}  onChange={this.handleChange}/>
                            <label class="active" for="address">Address</label>
                            <input type="text" id="address" name="user_address" placeholder={this.state.address}  onChange={this.handleChange}/>
                        </fieldset>
                    </div>
                    <button className="update-btn" onClick={this.handleSubmit}>Update Details</button>
                    <button className="update-btn" >Update Password</button>
                    <button className="update-btn" >Update Verification Documents</button>
                    <button className="update-btn" onClick={this.handleDelete}>Delete Account</button>
                </form>
                
            </div>
        );
    }
}


export default ProfileDetails;
