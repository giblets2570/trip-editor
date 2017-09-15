import React, { Component } from 'react';
import AlertContainer from 'react-alert'

import UsersComponent from '../Users'
import TripsComponent from '../Trips'
import HomeComponent from '../Home'
import './style.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux'
import { isLoggedIn } from '../../actions/authActions'

import { userIsNotAuthenticated, userIsAuthenticated } from '../../auth'

const Users = userIsAuthenticated(['manager','admin'])(UsersComponent);
const Trips = userIsAuthenticated(['user','admin'])(TripsComponent);
const Home = userIsNotAuthenticated(HomeComponent);

class App extends Component {
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }
  constructor(){
    super();
    this.state = {}; 
  }
  componentWillMount() {
    this.props.dispatch(isLoggedIn());
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.error);
    if(newProps.error) {
      this.showAlert(newProps.error.message);
    }
  }
  showAlert(text){
    this.msg.show(text, {
      time: 2000,
      type: 'error'
    })
  }
  render() {
    return (
      <div>
        <BrowserRouter className="App">
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/users" component={Users}/>
              <Route path="/trips/:id" component={Trips}/>
              <Route path="/trips" component={Trips}/>
            </Switch>
          </div>
        </BrowserRouter>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    logged_in: store.auth.logged_in,
    error: store.auth.error
  }
})(App);
