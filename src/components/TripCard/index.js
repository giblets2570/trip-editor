import React, {Component} from 'react';

import { connect } from 'react-redux'

import { 
  Card, CardText, CardBlock, CardTitle, CardHeader, Button, CardFooter
} from 'reactstrap'

import CreateTrip from '../CreateTrip'

import './style.css'

function daysBetween(date1, date2) {
  date1 = new Date(new Date(date1).toDateString());
  date2 = new Date(new Date(date2).toDateString());
  return (date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24);
}

class TripCard extends Component {
  constructor() {
    super();
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit(){
    this.setState({
      destination: this.props.trip.destination,
      editing: !this.state.editing
    })
  }
  render() {
    const daysUntil = daysBetween(this.props.trip.startDate, new Date());

    let daysUntilCard;
    if(daysUntil > 0) {
      daysUntilCard = <CardTitle>{daysUntil} days to go!</CardTitle>;
    }else if(daysUntil < 0){
      daysUntilCard = <CardTitle>Started {-daysUntil} days ago!</CardTitle>;
    }else{
      daysUntilCard = <CardTitle>It's happenning today!</CardTitle>;
    }
    return (
      <div>
        <Card className="card">
          <CardHeader tag="h3">{this.props.trip.destination}</CardHeader>
          <CardBlock>
            {daysUntilCard}
            <CardText>{this.props.trip.comments}</CardText>
          </CardBlock>
          <CardFooter><Button onClick={this.toggleEdit}>Edit</Button></CardFooter>
        </Card>
        <CreateTrip isOpen={this.state.editing} toggle={this.toggleEdit} trip={this.props.trip}/>
      </div>
    );
  }
}

export default connect()(TripCard);