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

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Cities" component={Cities}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/SignIn" component={SignIn}/>
        <Route path="/Itineraries" component={Itineraries}/>
      </Switch>
  );
}

export default Routes;
