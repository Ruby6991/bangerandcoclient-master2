import React, { Component } from 'react'
import BookingReceipt from './BookingReceipt'
const axios = require("axios")

class BookingsHistory extends Component {

    constructor(props){
        super(props);
        this.state={
            bookings:[]
        }
    }

    componentDidMount(){
        const that = this;

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            email:localStorage.email
        }
        console.log(headersInfo);
        axios.post("http://localhost:8080/GetUserBookings",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                bookings:res.data
            })
        }).catch(function(error){
            console.log(error);
        })
       
    }

    render(){
        return (
            <div className="bookings-history">
                <h1>Booking History</h1>
                    { this.state.bookings && this.state.bookings.map(booking => 
                        {
                            return(
                                <BookingReceipt booking={booking} key={booking.id}/>
                            )
                    })}
                    <br/>
            </div>
        )
    }
    
}

export default BookingsHistory;
