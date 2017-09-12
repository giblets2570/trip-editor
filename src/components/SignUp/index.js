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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: ""
    };
    this.toggle = this.toggle.bind(this);
    this.signup = this.signup.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  async signup(e) {
    e.preventDefault();
    let result = await axios.post('http://localhost:8000/users',{
      email: this.state.email,
      password: this.state.password
    });
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
          <Form onSubmit={this.signup}>
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
        <NavLink href="#" onClick={this.toggle}>Sign up</NavLink>
        {this.renderModal()}
      </NavItem>
    )
  }
}

export default SignUp;