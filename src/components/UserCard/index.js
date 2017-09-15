import React, {Component} from 'react';

import { connect } from 'react-redux'

import { 
  Card, CardText, CardBlock, CardTitle, CardHeader, Button, CardFooter
} from 'reactstrap'

import CreateUser from '../CreateUser'

import './style.css'

class UserCard extends Component {
  constructor() {
    super();
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit(){
    this.setState({
      editing: !this.state.editing
    })
  }
  render() {
    return (
      <div>
        <Card className="card">
          <CardBlock>
            <CardTitle>Name: {this.props.user.name}</CardTitle>
            <CardText>Email: {this.props.user.email}</CardText>
          </CardBlock>
          <CardFooter><Button onClick={this.toggleEdit}>Edit</Button></CardFooter>
        </Card>
        <CreateUser isOpen={this.state.editing} toggle={this.toggleEdit} user={this.props.user}/>
      </div>
    );
  }
}

export default connect()(UserCard);