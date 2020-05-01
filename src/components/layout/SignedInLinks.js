import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class SignedInLinks extends Component{
    constructor(props){
        super(props);
        this.signOut=this.signOut.bind(this);
    }

    signOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        console.log(localStorage);
    }

    render(){
        return (
            <ul>
                <li><NavLink to='/dashboard'><i class="material-icons left">home</i>Home</NavLink></li>
                <li><NavLink to='/vehicles'><i class="material-icons left">time_to_leave</i>Vehicles</NavLink></li>
                <li><NavLink to='/contact'><i class="material-icons left">email</i>Contact Us</NavLink></li>
                <li><NavLink to='/account'><i class="material-icons left">account_circle</i>My Account</NavLink></li>
                <li><a href="/" onClick={this.signOut}>Logout</a></li>
            </ul>
        )
    }
    
}

export default SignedInLinks