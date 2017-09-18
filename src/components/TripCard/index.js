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
      editing: !this.state.editing
    })
  }
  render() {
    const daysUntil = daysBetween(this.props.trip.startDate, new Date());

    let daysUntilCard;
    if(daysUntil > 0) {
      daysUntilCard = `${daysUntil} day${daysUntil===0?"":"s"} away`;
    }else if(daysUntil === 0){
      daysUntilCard = `It's happenning today!`;
    }
    return (
      <div>
        <Card className="card">
          <CardHeader tag="h3">
            {this.props.trip.destination}
          </CardHeader>
          <CardBlock>
            <CardText>{this.props.trip.comments}</CardText>
          </CardBlock>
          <CardFooter>
            <Button onClick={this.toggleEdit}>Edit</Button>
            <span style={{float: "right"}}>
              {daysUntilCard}
            </span>
          </CardFooter>
        </Card>
        <CreateTrip isOpen={this.state.editing} toggle={this.toggleEdit} trip={this.props.trip}/>
      </div>
    );
  }
}

export default connect()(TripCard);