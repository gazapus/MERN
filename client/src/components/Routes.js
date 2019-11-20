import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Cities from './Cities';
import Home from './Home';
import LogIn from './LogIn';
import SignIn from './SignUp';
import Itineraries from './Itineraries';
import Acti from './ActivitiesCarousel';

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Cities" component={Cities}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/SignIn" component={SignIn}/>
        <Route path="/Itineraries/:idCity" component={Itineraries}/>
        <Route path="/Acti" component={Acti}/>
      </Switch>
  );
}

export default Routes;
