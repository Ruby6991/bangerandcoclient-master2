import React, { Component } from 'react';
import M from "materialize-css";

class ProfileDetails extends Component {
    state = {
        fullname:'',
        email:'',
        password:'',
        dateOfBirth:'',
        phoneNo:'',
        address:''
    }

    componentDidMount(){
        const datepicker=document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker,{});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="profile-details">
                 <form onSubmit={this.handleSubmit}>
                    <h1>Update Account</h1>
                    <div className="field-sets">
                        <fieldset>
                            <legend><span class="number">1</span> Your basic info</legend>
                            <input type="text" id="name" name="user_name" placeholder="Your Name*" onChange={this.handleChange}/>
                            <input type="email" id="email" name="user_email" placeholder="Your Email*" onChange={this.handleChange}/>
                            <input type="password" id="password" name="user_password" placeholder="Your Password*" onChange={this.handleChange}/>
                            <input type="text" class="datepicker" id="dateOfBirth" name="date_of_birth" placeholder="Your Date of Birth" onChange={this.handleChange}/>
                            <input type="tel" id="phoneNo" name="phone_no" placeholder="Your Phone Number" onChange={this.handleChange}/>
                            <input type="text" id="address" name="user_address" placeholder="Address " onChange={this.handleChange}/>
                        </fieldset>
                    </div>
                    <button className="update-btn" type="submit">Update</button>
                    <button className="update-btn" >Delete Account</button>
                </form>
                
            </div>
        );
    }
}


export default ProfileDetails;
