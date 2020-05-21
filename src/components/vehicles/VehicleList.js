import React from 'react'
import VehicleSummary from './VehicleSummary'
import { Component } from 'react'
const axios = require("axios")

class VehicleList extends Component{

    constructor(props){
        super(props);
        this.state={
            vehicles:this.props.vehicles,
            category:this.props.category
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            category: nextProps.category
        })
    }

    render(){
        return (
            <div>
                <div class="main">
                    <h1>Available Vehicles</h1>
                    <ul class="cards">
                        { this.state.vehicles && this.state.vehicles.map(vehicle => 
                        {
                            if(vehicle.category===this.state.category)
                            {
                                return(
                                    <VehicleSummary vehicle={vehicle} key={vehicle.id} />
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        )
    }
    
}

export default VehicleList;
