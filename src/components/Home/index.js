import React, { Component } from 'react'

import { 
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
import './style.css'

import { connect } from 'react-redux'
import { login, signup, toggle, passwordWrong } from '../../actions/authActions'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCheck: ""
    }
    this.toggle = this.toggle.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    })
  }
  submit(e) {
    e.preventDefault()
    if(this.props.login_screen) {
      this.props.dispatch(login(this.state))  
    }else{
      if(this.state.password !== this.state.passwordCheck){
        this.props.dispatch(passwordWrong())
      }else{
        this.props.dispatch(signup(this.state))
      }
    }
  }
  toggle() {
    this.props.dispatch(toggle())
  }
  render() {
    const header  = this.props.login_screen ? "Login" : "Signup"
    const link    = this.props.login_screen 
                  ? "Don't have an account?" 
                  : "Already have an account?"

    let template = (
      <div>
        <FormGroup>
          <Label 
            for="Email">Email</Label>
          <Input
            type="email"
            value={this.state.email}
            name="email"
            id="Email"
            onChange={(e) => this.handleChange(e, 'email')}
            placeholder="" />
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
            placeholder="" />
        </FormGroup>
      </div>
    )

    if(!this.props.login_screen) {
      template = (
        <div>
          <FormGroup>
            <Label 
              for="Name">Name</Label>
            <Input
              type="text"
              value={this.state.name}
              name="name"
              id="Name"
              onChange={(e) => this.handleChange(e, 'name')}
              placeholder="" />
          </FormGroup>
          {template}
          <FormGroup>
            <Label 
              for="PasswordCheck">Password Check</Label>
            <Input
              type="password"
              value={this.state.passwordCheck}
              name="name"
              id="PasswordCheck"
              onChange={(e) => this.handleChange(e, 'passwordCheck')}
              placeholder="" />
          </FormGroup>
        </div>
      )
    }

    return (
      <div>
        <Navigation match={this.props.match}></Navigation>
        <div className="login">
          <h3>{header}</h3>
          <Form onSubmit={this.submit}>
            {template}
            <Button id='submitButton'>
              Submit
            </Button> 
          </Form>
          <a to='#' id='toggleLogin' className="right" onClick={this.toggle}> {link} </a>
        </div>
      </div>
    )
  }
}

const HomeConnected = connect((store) => {
  return {
    error: store.auth.error,
    login_screen: store.auth.login_screen
  }
})(Home)

export default HomeConnected