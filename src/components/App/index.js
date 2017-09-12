import React, { Component } from 'react';

import SignUp from '../SignUp'
import Login from '../Login'
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import './style.css';
import axios from 'axios';

function LoadingNav(props) {
  if(!props.loaded) return null;
  if(!props.result) {
    return (
      <Nav className="ml-auto" navbar>
        <Login/><SignUp/>
      </Nav>
    )
  }
  return null;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      modal: false,
      loaded: false,
      result: false
    }
    this.checkIfLoggedIn();
    this.toggle = this.toggle.bind(this);
  }
  async checkIfLoggedIn() {
    try{
      let result = await axios.get('http://localhost:8000/auth/loggedin');
      if(result.data === 0) {
        this.setState({
          loaded: true,
          result: false
        });
      }else{
        this.setState({
          loaded: true,
          result: true
        });
      }
    }catch(e){
      this.setState({
        loaded: true,
        result: false
      });
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <LoadingNav 
              loaded={this.state.loaded}
              result={this.state.result}
            />
          </Collapse>
        </Navbar>
        <div className="App">
          <div className="App-header">
            <h2>Trip Planner</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
