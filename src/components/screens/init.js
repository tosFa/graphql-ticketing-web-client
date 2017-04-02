import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Issue from './issue';
import Issues from './issues';
import Login from './adminLogin';

export default () => <Router>
  <div>
    <Route exact path="/" component={Login}/>
    <Route path="/issues" component={Issues}/>
    <Route path="/issue/:uuid" component={Issue}/>
  </div>
</Router>;