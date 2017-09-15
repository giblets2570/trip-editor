import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { logout } from '../../actions/authActions'

import { 
  Modal, ModalHeader, ModalBody,
  Button, Form,
  FormGroup, Input, Label
} from 'reactstrap';

import { DateRangePicker } from 'react-dates';
import { passwordWrong, create, update, remove } from '../../actions/authActions'

class CreateUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCheck: ""
    };
    this.submit = this.submit.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: this.props.user ? this.props.user.name : "",
      email: this.props.user ? this.props.user.email : "",
      password: this.props.user ? this.props.user.password : "",
      passwordCheck: this.props.user ? this.props.user.passwordCheck : ""
    })
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  submit(e) {
    e.preventDefault();
    console.log(this.props.user);
    if(this.props.user && this.props.user._id){
      this.update();
    }else{
      this.create();
    }
    this.props.toggle();
  }
  create(){
    if(this.state.password !== this.state.passwordCheck){
      this.props.dispatch(passwordWrong());
    }else{
      this.props.dispatch(create(this.state));
    }
  }
  update(){
    if(this.state.password !== this.state.passwordCheck){
      this.props.dispatch(passwordWrong());
    }else{
      this.props.dispatch(update(this.props.user._id,this.state));
    }
  }
  remove(){
    this.props.dispatch(remove(this.props.user._id));
    this.props.toggle();
  }
  render(){
    const header = this.props.user ? "Editing user" : "Create a user";
    let deleteButton = null;
    if(this.props.user) {
      deleteButton = (
        <Button onClick={this.remove}>
          Delete
        </Button>
      )
    }
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{header}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.submit}>
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
                for="Password">New Password</Label>
              <Input
                type="password"
                value={this.state.password}
                name="password"
                id="Password"
                onChange={(e) => this.handleChange(e, 'password')}
                placeholder="" />
            </FormGroup>
            <FormGroup>
              <Label 
                for="PasswordCheck">New Password Check</Label>
              <Input
                type="password"
                value={this.state.passwordCheck}
                name="name"
                id="PasswordCheck"
                onChange={(e) => this.handleChange(e, 'passwordCheck')}
                placeholder="" />
            </FormGroup>
            <Button>
              Submit
            </Button>
            {deleteButton}
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default connect()(CreateUser);