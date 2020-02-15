import React, { Component } from 'react';

class SignInAndJoin extends Component {
    state = {
        fullname:'',
        address:'',
        email:'',
        phoneNo:'',
        dateOfBirth:'',
        password:''
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

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="outer-container">
                <div class="container-starter" id="container">
                    <div class="form-container sign-up-container">
                        <form onSubmit={this.handleSubmit} >
                            <h1>Create Account</h1>
                            <div class="social-container">
                                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Full Name" id="name" onChange={this.handleChange}/>
                            <input type="text" placeholder="Address" id="address" onChange={this.handleChange}/>
                            <input type="tel" placeholder="Phone Number" id="phoneNo" onChange={this.handleChange}/>
                            <input type="email" placeholder="Email" id="email" onChange={this.handleChange}/>
                            <input type="password" placeholder="Password" id="password" onChange={this.handleChange} />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div class="form-container sign-in-container">
                        <form onSubmit={this.handleSubmit} >
                            <h1>Sign in</h1>
                            <div class="social-container">
                                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
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