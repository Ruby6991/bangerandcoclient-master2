import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => { 
        return (
            <ul>
                <li><NavLink to='/dashboard'><i class="material-icons left">home</i>Home</NavLink></li>
                <li><NavLink to='/vehicles'><i class="material-icons left">time_to_leave</i>Vehicles</NavLink></li>
                <li><NavLink to='/contact'><i class="material-icons left">email</i>Contact Us</NavLink></li>
                <li><NavLink to='/signinjoin'>Login/Sign Up</NavLink></li>
            </ul>
        )
    
}

export default SignedOutLinks