import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SignInAndJoin from './components/auth/SignInAndJoin'
import Dashboard from './components/common/Dashboard'
import Vehicles from './components/vehicles/Vehicles'
import Contact from './components/common/ContactUs'
import Account from './components/profile/Profile'
import VehicleDetails from './components/vehicles/VehicleDetails'
import Booking from './components/profile/Booking';
import BookingsHistory from './components/profile/BookingsHistory';
import ProfileDetails from './components/profile/ProfileDetails';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          {/* <SignInAndJoin/> */}
          <Navbar/>
          {/* <ProfileDetails/> */}
          <Switch>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/vehicles' component={Vehicles}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/account' component={Account}/>
            {/* <Route path='/logout' component={}/> */}
            <Route path='/vehicle/:id' component={VehicleDetails}/>
          </Switch> 
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
