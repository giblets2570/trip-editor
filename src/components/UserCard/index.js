import React, {Component} from 'react';

import { connect } from 'react-redux'

import { 
  Card, CardText, CardBlock, CardTitle, Button, CardFooter
} from 'reactstrap'

import { Link } from 'react-router-dom'

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
    let seeTrips = null;
    if(this.props.currentUser.role === 'admin' && this.props.user.role === 'user'){
      seeTrips = (
        <Button tag={Link} to={`/trips/${this.props.user._id}`}>
          See trips
        </Button>
      )
    }
    return (
      <div>
        <Card className="card">
          <CardBlock>
            <CardTitle>Name: {this.props.user.name}</CardTitle>
            <CardText>Email: {this.props.user.email}</CardText>
          </CardBlock>
          <CardFooter>
            <Button onClick={this.toggleEdit}>Edit</Button>
            {seeTrips}
          </CardFooter>
        </Card>
        <CreateUser isOpen={this.state.editing} toggle={this.toggleEdit} user={this.props.user}/>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    currentUser: store.auth.user
  }
})(UserCard);