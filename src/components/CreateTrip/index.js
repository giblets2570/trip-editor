import React, { Component } from 'react';
import { connect } from 'react-redux'
import windowSize from 'react-window-size';
import moment from 'moment'

import { 
  Modal, ModalHeader, ModalBody,
  Button, Form,
  FormGroup, Input, Label
} from 'reactstrap';

import { DateRangePicker } from 'react-dates';

import { create, update } from '../../actions/tripsActions'

class Trips extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggled: false,
      isOpen: false,
      startDate:    this.props.trip ? moment(this.props.trip.startDate) : null,
      endDate:      this.props.trip ? moment(this.props.trip.endDate) : null,
      destination:  this.props.trip ? this.props.trip.destination : "",
      comments:     this.props.trip ? this.props.trip.comments : ""
    }
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.save = this.save.bind(this);
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  save(e){
    e.preventDefault();
    if(this.props.trip && this.props.trip._id){
      this.update();
    }else{
      this.create();
    }
  }
  create(){
    this.props.dispatch(create({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      destination: this.state.destination,
      comments: this.state.comments
    }));
    this.props.toggle();
  }
  update(){
    this.props.dispatch(update(this.props.trip._id, {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      destination: this.state.destination,
      comments: this.state.comments
    }));
    this.props.toggle();
  }
  render(){
    const header = this.props.trip ? "Editing trip" : "Create a trip";
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{header}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.save}>
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
            <FormGroup>
              <Label for="When">When</Label>
              <br/>
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                displayFormat="DD/MM/YYYY"
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                withFullScreenPortal={this.props.windowWidth < 768}
                orientation={this.props.windowWidth < 768 ? "vertical" : "horizontal"}
              />
            </FormGroup>
            <FormGroup>
              <Label 
                for="Comments">Comments</Label>
              <Input
                type="textarea"
                value={this.state.comments}
                name="email"
                id="Comments"
                onChange={(e) => this.handleChange(e, 'comments')}
                placeholder="I'm looking forward to the crepes" />
            </FormGroup>
            <Button>
              Submit
            </Button> 
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default connect()(windowSize(Trips));