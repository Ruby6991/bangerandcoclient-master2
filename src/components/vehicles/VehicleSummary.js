import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class VehicleSummary extends Component {
    constructor(props){
        super(props);
        this.state={
            imgUrl:this.props.vehicle.imgUrl,
            model:this.props.vehicle.model,
            category:this.props.vehicle.category,
            id:this.props.vehicle.id,
            redirectToDetails:false
        }
        this.viewDetails = this.viewDetails.bind(this);
    }

    viewDetails(){
        this.setState({
            redirectToDetails:true
        })
    }

    render(){
        return (
            <li class="cards_item">
                {
                    this.state.redirectToDetails?(
                        <Redirect to={{
                            state: { id: this.state.id },
                            pathname: '/vehicle/'+this.state.id 
                          }}/>
                    ):("")
                }
                <div class="card">
                    <div class="card_image"><img src={this.state.imgUrl} alt=""/></div>
                    <div class="card_content">
                        <h2 class="card_title">{this.state.model}</h2>
                            {this.state.category === 'Small Town Cars' ?(
                                <div className="card-details">
                                    <p class="card_text"> Bags: 2-4 </p> 
                                    <p class="card_text"> Passengers: 2-5 </p> 
                                </div>
                                ):this.state.category === 'Family Vehicles'?(
                                    <div className="card-details">
                                        <p class="card_text"> Bags: 2-5 </p> 
                                        <p class="card_text"> Passengers: 4-7 </p> 
                                    </div>
                                ):(
                                    <div className="card-details">
                                        <p class="card_text"> Bags: 2-7 </p> 
                                        <p class="card_text"> Passengers: 4-15 </p> 
                                    </div>
                                )}
                        <button class="btn card_btn" onClick={this.viewDetails}>View Details</button>
                    </div>
                </div>
            </li>
        )
    }
    
}

export default VehicleSummary;
