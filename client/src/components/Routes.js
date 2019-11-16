import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Cities from './Cities';
import Home from './Home';
import LogIn from './LogIn';
import SignIn from './SignIn';
import Itineraries from './Itineraries';
import Activities from './Activities';

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Cities" component={Cities}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/SignIn" component={SignIn}/>
        <Route path="/Itineraries/:idCity" component={Itineraries}/>
        <Route path="/Activities" component={Activities}/>
      </Switch>
  );
}

export default Routes;
