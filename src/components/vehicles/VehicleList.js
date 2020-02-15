import React from 'react'
import VehicleSummary from './VehicleSummary'

const VehicleList = ({vehicles}) => {
    return (
        <div>
            <div class="main">
                <h1>Available Vehicles</h1>
                <ul class="cards">
                    { vehicles && vehicles.map(vehicle => {
                        return (
                            <VehicleSummary vehicle={vehicle} key={vehicle.id} />
                        )
                    })}
                </ul>
                </div>
        </div>
    )
}

export default VehicleList;
