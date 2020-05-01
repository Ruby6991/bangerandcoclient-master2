import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignInAndJoin from './components/auth/SignInAndJoin'
import Dashboard from './components/common/Dashboard'
import Vehicles from './components/vehicles/Vehicles'
import Contact from './components/common/ContactUs'
import Account from './components/profile/Profile'
import VehicleDetails from './components/vehicles/VehicleDetails'
import Booking from './components/profile/Booking';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/signinjoin' component={SignInAndJoin}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/vehicles' component={Vehicles}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/account' component={Account}/>
            <Route path="/logout" component={Dashboard}/>
            <Route path='/vehicle/:id' component={VehicleDetails}/>
            <Route path='/booking' component={Booking}/>
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
