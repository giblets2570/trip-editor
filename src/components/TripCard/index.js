import React, {Component} from 'react';

import { connect } from 'react-redux'

import { 
  Card, CardText, CardBlock, CardTitle, 
  CardSubtitle, Button, Tooltip, Form, 
  FormGroup, Label, Input
} from 'reactstrap'

import './style.css'

import { update } from '../../actions/tripsActions'

function daysBetween(date1, date2) {
  date1 = new Date(new Date(date1).toDateString());
  date2 = new Date(new Date(date2).toDateString());
  return (date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24);
}

class TripCard extends Component {
  constructor() {
    super();
    this.state = {
      editingDestination: false,
      tooltipOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.update = this.update.bind(this);
    this.toggleEditDestination = this.toggleEditDestination.bind(this);
  }
  toggleEditDestination(){
    this.state.destination = this.props.trip.destination;
    this.setState({
      editingDestination: !this.state.editingDestination
    })
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  update(e) {
    e.preventDefault();
    let updated = {};
    if(this.state.editingDestination) {
      updated.destination = this.state.destination;
      this.toggleEditDestination();
    }
    this.props.dispatch(update(this.props.trip._id, updated));
  }
  render() {
    const daysUntil = daysBetween(new Date(), this.props.trip.startDate);

    let daysUntilCard;
    if(daysUntil > 0) {
      daysUntilCard = <CardSubtitle>{daysUntil} days to go!</CardSubtitle>;
    }else if(daysUntil < 0){
      daysUntilCard = <CardSubtitle>Started {-daysUntil} days ago!</CardSubtitle>;
    }else{
      daysUntilCard = <CardSubtitle>It's happenning today!</CardSubtitle>;
    }

    

    let title;
    if(this.state.editingDestination){
      title = (
        <Form onSubmit={this.update}>
          <FormGroup>
            <Label 
              for="Destination">Destination</Label>
            <Input
              type="text"
              value={this.state.destination}
              name="destination"
              id="Destination"
              onChange={(e) => this.handleChange(e, 'destination')}
              placeholder="Paris" />
          </FormGroup>
          <Button>
            Save
          </Button> 
          <Button onClick={this.toggleEditDestination}>
            Cancel
          </Button>
        </Form>
      )
    }else{
      title = (
        <CardTitle onClick={this.toggleEditDestination}>
          <span id="DisabledAutoHideExample">{this.props.trip.destination}</span>
          <Tooltip placement="top" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
            Click to edit destination
          </Tooltip>
        </CardTitle>
      )
    }

    return (
      <div>
        <Card className="card">
          <CardBlock>
            {title}
            {daysUntilCard}
            <CardText>{this.props.trip.comments}</CardText>
            <Button>Button</Button>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(TripCard);