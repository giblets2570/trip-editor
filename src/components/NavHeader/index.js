import React, { Component } from 'react';

import SignUp from '../SignUp'
import Login from '../Login'
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

import {
  BrowserRouter,
  Route,
  NavLink,
  Link,
  Switch 
} from 'react-router-dom';

import { connect } from 'react-redux'
import { login } from '../../actions/authActions'

class NavHeader extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      email: "",
      password: "",
      modal: false,
      toggled: false
    }
  }
  toggle() {
    this.setState({
      toggled: !this.state.toggled
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  login(e) {
    e.preventDefault();
    this.props.dispatch(login(this.state.email,this.state.password));
    this.toggleModal();
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  render() {
    let navLinks;
    if(!this.props.logged_in) {
      navLinks = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="#" onClick={this.toggleModal}>Login</NavLink>
          </NavItem>
        </Nav>
      )
    }else{
      navLinks = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/trips">Trips</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/account">My account</NavLink>
          </NavItem>
        </Nav>
      )
    }
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand to="/">reactstrap</NavbarBrand>
          <Collapse isOpen={this.state.toggled} navbar>
            {navLinks}
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.login}>
              <FormGroup>
                <Label 
                  for="Email">Email</Label>
                <Input
                  type="email"
                  value={this.state.email}
                  name="email"
                  id="Email"
                  onChange={(e) => this.handleChange(e, 'email')}
                  placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label
                  for="Password">Password</Label>
                <Input
                  type="password"
                  value={this.state.password}
                  name="password"
                  id="Password"
                  onChange={(e) => this.handleChange(e, 'password')}
                  placeholder="password placeholder" />
              </FormGroup>
              <Button>
                Submit
              </Button> 
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    logging_in: store.auth.logging_in,
    logged_in: store.auth.logged_in,
    sign_in: store.auth.sign_in,
  }
})(NavHeader);
