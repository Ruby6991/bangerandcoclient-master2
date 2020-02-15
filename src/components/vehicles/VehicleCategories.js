import React from 'react'

const VehicleCategories = () => {
    return (
        <div className="category-list">
            <h1>Categories</h1>
            <div class="cards-list">
                <div class="card 1">
                    <div class="card_image"> <img src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=781&q=80" /> </div>
                    <div class="card_title title-white">
                        <p>Cars</p>
                    </div>
                </div>
                    <div class="card 2">
                        <div class="card_image">
                            <img src="https://images.unsplash.com/photo-1566347238843-0782a8526e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" />
                        </div>
                    <div class="card_title title-white">
                        <p>SUVs</p>
                    </div>
                </div>
                <div class="card 3">
                    <div class="card_image">
                        <img src="https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" />
                    </div>
                    <div class="card_title">
                        <p>Vans</p>
                    </div>
                </div>     
            </div>
        </div>
    )
}

export default VehicleCategories;
