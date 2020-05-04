import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileDetails from './ProfileDetails';
import BookingsHistory from './BookingsHistory';
import M from "materialize-css";
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
const axios = require("axios");

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            login:"",
            redirectToHome:false
        }
    }
    componentDidMount(){
        const tabs = document.querySelectorAll('.tabs')
        for (var i = 0; i < tabs.length; i++){
            M.Tabs.init(tabs[i]);
        }

        const that = this;
        console.log(localStorage);
        const token = 'Bearer '+localStorage.token;
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
            localStorage.setItem("firstName",data.firstName);
            that.setState({
                login:data
            })
        }).catch(function(error){
            console.log(error.response);
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
    render() {
        return (
            <div>
                <Navbar/>
                <div className="user-profile">
                    <h3 class="center">Hi There, {localStorage.firstName}</h3>
                    <ul class="tabs">
                        <li class="tab col s3"><a class="active" href="#test1"><strong>Update Account</strong></a></li>
                        <li class="tab col s3"><a href="#test2"><strong>Bookings History</strong></a></li>
                    </ul>
                    
                    <div id="test1" class="col s12"><ProfileDetails/></div>
                    <div id="test2" class="col s12"><BookingsHistory/></div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Profile;