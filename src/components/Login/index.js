import React, { Component } from 'react';

import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import axios from 'axios';

import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: ""
    };
    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  async login(e) {
    e.preventDefault();
    try{
      let result = await axios.post('http://localhost:8000/auth/login',{
        email: this.state.email,
        password: this.state.password
      });
    } catch(e) {
      console.log(e);
    }
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  renderModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
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
    )
  }
  render(){
    return (
      <NavItem>
        <NavLink href="#" onClick={this.toggle}>Login</NavLink>
        {this.renderModal()}
      </NavItem>
    )
  }
}

export default connect((store) => {
  return {
    logging_in: store.auth.logging_in
  }
})(Login);