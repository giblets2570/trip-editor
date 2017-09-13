import React, { Component } from 'react';

import TripsComponent from '../Trips'
import LoginComponent from '../Login'

import './style.css';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import { connect } from 'react-redux'
import { isLoggedIn } from '../../actions/authActions'

import { userIsNotAuthenticated, userIsAuthenticated } from '../../auth'


const Trips = userIsAuthenticated(TripsComponent);
const Login = userIsNotAuthenticated(LoginComponent);

class App extends Component {
  componentWillMount() {
    this.props.dispatch(isLoggedIn());
  }
  render() {
    return (
      <BrowserRouter className="App">
        <div>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/trips" component={Trips}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect((store) => {
  return {
    logged_in: store.auth.logged_in
  }
})(App);
