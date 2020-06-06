import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
const axios = require("axios")


class CompetitorInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicles:[],
            model:'',
            rates:'',
            category:'',
            imgUrl:'',
            competitorVehicles:[]
        }
    }

    componentDidMount(){
        const that=this;
        console.log(localStorage);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            email:localStorage.email
        }
        console.log(headersInfo);
        axios.post("http://localhost:8080/GetVehicleList",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                vehicles:res.data
            })
        }).catch(function(error){
            console.log(error.response);
        })

        
        axios.get("http://localhost:8080/getCompetitorInfo",{
            headers:headersInfo
        })
        .then(function(res){
            const data = res.data;
            that.setState({
                competitorVehicles: data
            })
            
            console.log(data);
        }).catch(function(error){
            console.log(error);
        })
    }

    render() {
        return (
            <div class="vehicles">
                <div class="content bg">
                    <div class="row">
                        <div class="col s6">
                            <div class="card card-bg">
                                <span class="card-title center">Banger & Co Vehicles</span>
                                <table class="responsive-table highlight">
                                    <thead>
                                        <tr>
                                            <th class="grey darken-4 white-text">Model</th>
                                            <th class=" grey darken-4 white-text">Category</th>
                                            <th class="grey darken-4 white-text">Rates</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    { this.state.vehicles && this.state.vehicles.map(vehicle => 
                                        {
                                            return(
                                                <tr>
                                                    <td class="center">
                                                        <i><b>{vehicle.model}</b></i><br/><br/>
                                                        <img class="responsive-img" src={vehicle.imgUrl} alt=""/><br/>
                                                    </td>
                                                    <td class="grey darken-4 center white-text">
                                                        {vehicle.category}
                                                    </td>
                                                    <td class="center">{vehicle.rates} Euros</td>
                                                </tr>
                                            )
                                        })}
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col s6">
                            <div class="card card-bg">
                                <span class="card-title center">Express Rent a Car</span>
                                <table class="responsive-table highlight">
                                    <thead>
                                        <tr>
                                            <th class="grey darken-4 white-text">Model</th>
                                            <th class=" grey darken-4 white-text">Category</th>
                                            <th class="grey darken-4 white-text">Rates</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    { 
                                        this.state.competitorVehicles && this.state.competitorVehicles.map(vehicle => 
                                        {
                                            return(
                                                <tr>
                                                    <td class="center">
                                                        <i><b>{vehicle.vehicleModel}</b></i><br/><br/>
                                                        <img class="responsive-img" 
                                                        src={vehicle.vehicleImage} 
                                                        alt=""/>
                                                        <br/>
                                                    </td>
                                                    <td class="grey darken-4 white-text center">
                                                        {vehicle.category}
                                                    </td>
                                                    <td class="center">{vehicle.rates.split(" ")[0]} Euros</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                    
            </div>
        );
    }
}

export default CompetitorInfo;