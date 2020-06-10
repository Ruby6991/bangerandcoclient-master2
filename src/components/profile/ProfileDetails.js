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
            dateOfBirth:'',
            phoneNo:'',
            address:'',
            redirectToHome:false,
            currentPsw:'',
            newPsw:'',
            bookings:[],
            selectedFile:'',
            document:''
        }
        this.updatePassword = this.updatePassword.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

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
                address:data.address
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

        axios.post("http://localhost:8080/GetUserBookings",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            const data = res.data;
            that.setState({
                bookings:data
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

        axios.get("http://localhost:8080/doc/getDocumentFile/"+localStorage.email,{
            headers:headersInfo
        })
        .then(function(res){
            const data = res.data;
            that.setState({
                document: data
            })
            
            // console.log(that.state.document);
        }).catch(function(error){
            console.log(error);
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

    updatePassword = (e) => {
        e.preventDefault();
        console.log(this.state);

        if(this.state.currentPsw==='' || this.state.newPsw==='' ){
            alert("Please fill in the required fields");
            return;
        }

        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }

        const formData = new FormData();
            formData.append('currentPsw', this.state.currentPsw);
            formData.append('newPsw', this.state.newPsw);

        axios.put("http://localhost:8080/UpdatePassword/"+localStorage.email,formData,config)
            .then(function(res){
                console.log("Password updated successfully!");
                alert("Password updated successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("Password update un-successful!\nError : ",error.response);
                alert("Password update un-successful!");
         })
    }

    handleDelete = (e) => {
        e.preventDefault();
        let pendingBookings = false; 
        this.state.bookings.map(booking => 
            {
                if(booking.bookingState==="Pending"){
                    pendingBookings=true;
                }
            })

        if(pendingBookings){
            alert("Sorry. You Cannot Delete Your Account While Your Bookings are Pending.");
            return;
        }
            
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

    updateDocument= (e) => {
        e.preventDefault();
        console.log(this.state);
        const that=this;
        console.log(that);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }

        if(that.state.document===''){
            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            formData.append('userId', localStorage.email);
            formData.append('fileType', 'Drivers License');
            axios.post("http://localhost:8080/doc/upload", formData,{
                headers:headersInfo
            })
                .then(res => {
                    console.log(res.data);
                    console.log("Document uploaded successfully.");
                }).catch(function(error){
                    console.log("Error : ",error.response);
                    console.log("Document Upload Failed");
            })
        }

        if(that.state.document!=='' && that.state.selectedFile!==''){
            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            formData.append('userId', localStorage.email);
            axios.post("http://localhost:8080/doc/updateFile", formData,{
                headers:headersInfo
            })
                .then(res => {
                    console.log(res.data);
                    if(res.data.status === 200){
                        console.log("Document updated successfully.");
                    }else{
                        console.log("Document update unsuccessful.");
                    }
                }).catch(function(error){
                    console.log("Error : ",error);
                    console.log("Document Update Failed");
            })
        }
        
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
                </form>

                <button className="update-btn" onClick={this.handleDelete}>Delete Account</button>

                {/* <!-- Modal Trigger --> */}
                <button data-target="modal1"  class="modal-trigger update-btn" >Update Password</button>

                {/* <!-- Modal1 Structure --> */}
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4>Update Password</h4>
                        <form id="passWordForm">
                            <label class="active" for="currentPsw">Current Password</label>
                            <input type="password" placeholder="Password" id="currentPsw" onChange={this.handleChange} />
                            <label class="active" for="newPsw">New Password</label>
                            <input type="password" placeholder="Password" id="newPsw" onChange={this.handleChange} />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button style={{marginRight:30+'px'}} class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.updatePassword} >Update</button>
                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                    </div>
                </div>

                {/* <!-- Modal Trigger --> */}
                <button data-target="modal2"  class="modal-trigger update-btn" >Update Drivers License</button>

                {/* <!-- Modal2 Structure --> */}
                <div id="modal2" class="modal">
                    <div class="modal-content">
                        <h4>Update Drivers License</h4>
                        <form id="passWordForm">
                            <label for="nic-upload">Upload Scanned Copy of Driver's License</label>
                            <div id="nic-upload" class="file-field input-field">
                                <div id="upload-btn" class="btn-flat">
                                    <span>Upload</span>
                                    <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button style={{marginRight:30+'px'}}  class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.updateDocument} >Update</button>
                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                    </div>
                </div>
                
            </div>
        );
    }
}


export default ProfileDetails;
