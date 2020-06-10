import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import { Redirect } from "react-router-dom";

class SignInAndJoin extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            address:'',
            email:'',
            phoneNo:'',
            password:'',
            redirectToHome:false,
            redirectToRegister:false
        }
    }
    

    componentDidMount(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmitSignIn = (e) => {
        e.preventDefault();
        console.log(this.state);

        const login = {
            email:this.state.email,
            password:this.state.password
        }
        const that = this;
        if(login.email!=='' && login.password!==''){
        axios.post("http://localhost:8080/authenticate",login)
        .then(function(res){
            const data = res.data;
            console.log(data)
            localStorage.setItem("token",data.jwtToken);
            localStorage.setItem("email",that.state.email);
            localStorage.setItem("firstName",(data.firstName));
            that.setState({
                redirectToHome:true
            })
            console.log(localStorage);
        }).catch(function(error){
            const res = error.response;
            if(res.status === 403){
                alert("User has been Blacklisted"); 
                return;
            }else if(res.data.trace.includes("INVALID_CREDENTIALS") && res.status===401){
                alert("Invalid Email or Password. Please Try Again");
                return; 
            }else{
                alert("Server Error!");
            }
        })
        }else{
            alert("Please Fill in all the fields")
        } 
    }

    handleSubmitSignUp = (e) => {
        e.preventDefault();
        console.log(this.state);
        const login = {
            email:this.state.email,
            password:this.state.password
        };
        const user = {
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            phoneNo:this.state.phoneNo,
            address:this.state.address,
            password:this.state.password
        }
        console.log(user);

        const that = this;
        if(user.firstName!=='' && user.lastName!=='' && user.email!=='' && user.phoneNo!=='' && user.address!=='' && user.password!==''){
            axios.post("http://localhost:8080/Register",user)
            .then(function(res){
                alert("Registered Successfully!");
                console.log(login);
                axios.post("http://localhost:8080/authenticate",login)
                .then(function(res){
                    localStorage.setItem("token",res.data.jwtToken);
                    localStorage.setItem("email",that.state.email);
                    localStorage.setItem("firstName",(res.data.firstName));
                    that.setState({
                        redirectToHome:true
                    })
                })
            }).catch(function(error){
                const res = error.response;
                console.log(res);
                if(res.status===500){
                    alert("The provided email address is already associated with an account. Please enter a new email address."); 
                }else{
                    alert("Server Error!");
                }
            })
        }else{
            alert("Please Fill in all the fields")
        }  
    }

    render() {
        return (
            <div className="outer-container">
                {
                   this.state.redirectToHome?(
                       <Redirect to="/dashboard"/>
                   ):("")
                }
                <div class="container-starter" id="container">
                    <div class="form-container sign-up-container">
                        <form onSubmit={this.handleSubmitSignUp} >
                            <h1>Create Account</h1>
                            <input type="text" placeholder="First Name" id="firstName" onChange={this.handleChange}/>
                            <input type="text" placeholder="Last Name" id="lastName" onChange={this.handleChange}/>
                            <input type="text" placeholder="Address" id="address" onChange={this.handleChange}/>
                            <input type="tel" placeholder="Phone Number" id="phoneNo" onChange={this.handleChange}/>
                            <input type="email" placeholder="Email" id="email" onChange={this.handleChange}/>
                            <input type="password" placeholder="Password" id="password" onChange={this.handleChange} />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div class="form-container sign-in-container">
                        <form onSubmit={this.handleSubmitSignIn} >
                            <h1>Sign in</h1>
                            <input type="email" placeholder="Email" id="email" onChange={this.handleChange} />
                            <input type="password" placeholder="Password" id="password" onChange={this.handleChange}/>
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To stay connected with us please login with your personal info</p>
                                <button class="ghost" id="signIn">Sign In</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start your journey with us</p>
                                <button class="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInAndJoin;