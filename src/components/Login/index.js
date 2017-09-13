import React, { Component } from 'react';

import { 
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import './style.css'

import { connect } from 'react-redux'
import { login } from '../../actions/authActions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  login(e) {
    e.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }
  render(){
    return (
      <Form onSubmit={this.login} className="login">
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
    )
  }
}

export default connect((store) => {
  return {
    logging_in: store.auth.logging_in
  }
})(Login);