import React from 'react'

const BookingReceipt = () => {
    return (
        <div className="booking-receipt">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Booking ID: #12345 </span>
                    <table >
                        <tbody>
                        <tr>
                            <th>Vehicle</th>
                            <td>Tesla Model S</td>
                        </tr>
                        <tr>
                            <th>Hourly Rate</th>
                            <td>Rs.1500.00</td>
                        </tr>
                        <tr>
                            <th>Pick-up Date</th>
                            <td>2019/03/01</td>
                        </tr>
                        <tr>
                            <th>Return Date</th>
                            <td>2019/03/06</td>
                        </tr>
                        <tr>
                            <th>Rental Duration</th>
                            <td>5 days</td>
                        </tr>
                        <tr>
                            <th>Additional Utilities</th>
                            <td>GPS, Car Seat</td>
                        </tr>
                        <tr>
                            <th>Utility Cost</th>
                            <td>Rs.5000.00</td>
                        </tr>
                        <tr>
                            <th>Estimated Total</th>
                            <th>Rs.5490.00</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-action">
                    <button id="edit-btn">Edit</button>
                </div>
            </div>
        </div>
    )
}

export default BookingReceipt;
