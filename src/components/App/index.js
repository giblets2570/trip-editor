import React, { Component } from 'react';
// import logo from './logo.svg';
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    return (
      <NavItem>
        <NavLink href="#" onClick={this.toggle}>Signup</NavLink>
      </NavItem>
    )
  }
}

class LoadingNav extends Component {
  signup() {

  }
  render(){
    if(!this.props.loaded) return null;
    // console.log(props);
    if(!this.props.result) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <SignUp/>
        </Nav>
      )
    }
    return null;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      modalOpen: false,
      loggedIn: {
        loaded: false,
        result: false
      }
    }
    this.checkIfLoggedIn();
  }
  async checkIfLoggedIn() {
    try{
      let result = await axios.get('http://localhost:8000/users');
      console.log(result);
    }catch(e){
      console.log(e);
    }
    this.setState({
      loggedIn: {
        loaded: true,
        result: false 
      }
    })
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={() => this.toggle()} />
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <LoadingNav 
              loaded={this.state.loggedIn.loaded}
              result={this.state.loggedIn.result}
            />
          </Collapse>
        </Navbar>
        <div className="App">
          <div className="App-header">
            <h2>Trip Planner</h2>
            <Modal isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
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
