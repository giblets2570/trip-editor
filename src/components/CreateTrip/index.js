import React, { Component } from 'react';

import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import { create } from '../../actions/tripsActions'

class Trips extends Component {
  constructor(){
    super();
    this.state = {
      toggled: false,
      isOpen: false,
      startDate: null,
      endDate: null,
      destination: "",
      comments: ""
    }
    this.create = this.create.bind(this);
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  create(e){
    e.preventDefault();
    this.props.dispatch(create({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      destination: this.state.destination,
      comments: this.state.comments
    }));
    this.props.toggle();
  }
  render(){
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Create a trip</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.create}>
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

export default Trips;