import React from 'react'

const VehicleSummary = ({vehicle}) => {
    return (
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img src={vehicle.imgUrl} alt=""/></div>
                <div class="card_content">
                    <h2 class="card_title">{vehicle.model}</h2>
                        {vehicle.category === 'Small Town Cars' ?(
                            <div className="card-details">
                                <p class="card_text"> Bags: 2-4 </p> 
                                <p class="card_text"> Passengers: 2-5 </p> 
                            </div>
                            ):vehicle.category === 'Family Vehicles'?(
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
                    <button class="btn card_btn">View Details</button>
                </div>
            </div>
        </li>
    )
}

export default VehicleSummary;
