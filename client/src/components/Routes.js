import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import City from './City';
import Home from './Home';
import LogIn from './LogIn';
import SignIn from './SignIn';

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/City" component={City}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/SignIn" component={SignIn}/>
      </Switch>
  );
}

export default Routes;
