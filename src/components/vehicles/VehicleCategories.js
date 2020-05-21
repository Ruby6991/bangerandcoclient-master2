import React, { Component } from 'react'

class VehicleCategories extends Component{
    constructor(props){
        super(props);
        this.state={
            category:this.props.category
        }
        this.selectCategory = this.selectCategory.bind(this);
    }
    componentDidMount(){
        
    }
    
    selectCategory = (e) => {
        e.preventDefault();
        this.setState({
            category:e.target.id
        })
        console.log(this.state);
    }

    render(){
        return (
            <div className="category-list">
                <h1>Categories</h1>
                <div class="cards-list">
                    <div class="card 1">
                        <div class="card_image"> 
                            <img src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=781&q=80" /> </div>
                        <div class="card_title title-white">
                            <button class="waves-effect btn-flat btn-large white-text" onClick={this.selectCategory} id="Small Town Cars">Small Town Cars</button>
                        </div>
                    </div>
                        <div class="card 2">
                            <div class="card_image">
                                <img src="https://images.unsplash.com/photo-1566347238843-0782a8526e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" />
                            </div>
                        <div class="card_title title-white">
                            <button class="waves-effect btn-flat btn-large white-text" onClick={this.selectCategory} id="Family Vehicle">Family Vehicle</button>
                        </div>
                    </div>
                    <div class="card 3">
                        <div class="card_image">
                            <img src="https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" />
                        </div>
                        <div class="card_title">
                            <button class="waves-effect btn-flat btn-large white-text" onClick={this.selectCategory} id="Vans">Vans</button>
                        </div>
                    </div>     
                </div>
            </div>
        )
    }
    
}

export default VehicleCategories;
