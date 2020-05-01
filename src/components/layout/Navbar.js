import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

class Navbar extends Component {

    render() {
        return(
            <nav className="nav-extended">
                <div class="nav wrapper white">
                    <h4 class="blue-grey-text text-darken-4">Banger & Co</h4>
                </div>
                <div class="nav wrapper">
                    {
                        localStorage.token!==undefined?(
                            <SignedInLinks/>
                        ):(
                            <SignedOutLinks/>
                        )
                    }
                    
                </div>
            </nav>   
        )
    }
    
}

export default Navbar;