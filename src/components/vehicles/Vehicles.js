import React, { Component } from 'react';
import M from "materialize-css";
import VehicleList from './VehicleList';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
const axios = require("axios")

class Vehicles extends Component {
    constructor(props){
        super(props);
        this.state={
            category:'',
            previousCat:'',
            vehicles:[]
        }
        this.selectCategory = this.selectCategory.bind(this);
    }

    componentDidMount(){
        const carousel=document.querySelectorAll('.carousel');
        M.Carousel.init(carousel,{});

        const that = this;

        axios.post("http://localhost:8080/GetVehicleList"
        ).then(function(res){
            console.log(res.data);
            that.setState({
                vehicles:res.data
            })
        }).catch(function(error){
            console.log(error);
        })
       
    }

    selectCategory = (e) => {      
        this.setState({
            category:e.target.id
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="vehicles">
                    <div className="featured-vehicles">
                        <h1>Featured Vehicles</h1>
                        <div class="carousel">
                            <a class="carousel-item" href="#one!"><img src="https://images.unsplash.com/photo-1549772529-6b7d1dffce8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></a>
                            <a class="carousel-item" href="#two!"><img src="https://images.unsplash.com/photo-1531763247073-8636bf790f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></a>
                            <a class="carousel-item" href="#three!"><img src="https://images.unsplash.com/photo-1558486799-4ec09fdb129c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=780&q=80"/></a>
                            <a class="carousel-item" href="#four!"><img src="https://images.unsplash.com/photo-1563339007-6914941198b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></a>
                            <a class="carousel-item" href="#four!"><img src="https://images.unsplash.com/photo-1539043776866-20389265e4da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></a>
                            <a class="carousel-item" href="#five!"><img src="https://images.unsplash.com/photo-1566334003641-fbbc33f194d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></a>
                            <a class="carousel-item" href="#five!"><img src="https://images.unsplash.com/photo-1537126322380-e757d7feb2f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"/></a>
                        </div>
                    </div>
                    <nav>
                        <div class="nav-wrapper center">
                            <form>
                                <div id="search-bar" class="input-field">
                                    <input placeholder="Search Vehicles" id="search" type="search" required/>
                                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                    <i class="material-icons">close</i>
                                </div>
                            </form>
                        </div>
                    </nav>
                    <div className="vehicle-list">
                        <div className="category-list">
                            <h1>Categories</h1>
                            <div class="cards-list">
                                <div class="card 1">
                                    <div class="card_image"> 
                                        <img src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=781&q=80" /> </div>
                                    <div class="card_title title-white">
                                        <button class="waves-effect btn-flat btn-large white-text" onClick={this.selectCategory} id="Small Town Cars">Small Town Cars</button>
                                    </div>
                                </div>
                                    <div class="card 2">
                                        <div class="card_image">
                                            <img src="https://images.unsplash.com/photo-1566347238843-0782a8526e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" />
                                        </div>
                                    <div class="card_title title-white">
                                        <button class="waves-effect btn-flat btn-large white-text" onClick={this.selectCategory} id="Family Vehicles">Family Vehicles</button>
                                    </div>
                                </div>
                                <div class="card 3">
                                    <div class="card_image">
                                        <img src="https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" />
                                    </div>
                                    <div class="card_title">
                                        <button class="waves-effect btn-flat btn-large white-text" onClick={this.selectCategory} id="Vans">Vans</button>
                                    </div>
                                </div>     
                            </div>
                        </div>
                        {
                            this.state.category==="Small Town Cars"?(
                                <VehicleList vehicles={this.state.vehicles} category={"Small Town Cars"} />
                            ):this.state.category==="Family Vehicles"?(
                                <VehicleList vehicles={this.state.vehicles} category={"Family Vehicles"} />
                            ):this.state.category==="Vans"?(
                                <VehicleList vehicles={this.state.vehicles} category={"Vans"} />
                            ):"" 
                        }   
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Vehicles;