import React, { Component } from 'react';
import M from "materialize-css";
import VehicleList from './VehicleList';
import VehicleCategories from './VehicleCategories';
import { connect } from 'react-redux'

class Vehicles extends Component {
    componentDidMount(){
        const carousel=document.querySelectorAll('.carousel');
        M.Carousel.init(carousel,{});
    }
    render() {
        const { vehicles } =this.props;
        return (
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
                    <VehicleCategories/>
                    <VehicleList vehicles={vehicles} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => { 
    return {
        vehicles: state.vehicle.vehicles
    }
}

export default connect(mapStateToProps)(Vehicles);