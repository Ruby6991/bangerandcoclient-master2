import React from 'react'

const VehicleSummary = ({vehicle}) => {
    return (
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img src="https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=767&q=80"/></div>
                <div class="card_content">
                    <h2 class="card_title">{vehicle.name}</h2>
                    <div className="card-details">
                        <p class="card_text"> Bags: {vehicle.bags} </p> 
                        <p class="card_text"> Passengers: {vehicle.passengers} </p> 
                    </div>
                    <button class="btn card_btn">View Details</button>
                </div>
            </div>
        </li>
    )
}

export default VehicleSummary;
