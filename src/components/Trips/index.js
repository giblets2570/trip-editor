import React, { Component } from 'react';

import { connect } from 'react-redux'

import moment from 'moment';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import CreateTrip from '../CreateTrip'
import TripCard from '../TripCard'

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import { logout } from '../../actions/authActions'
import { fetch } from '../../actions/tripsActions'

class Trips extends Component {
  constructor(){
    super();
    this.state = {
      toggled: false,
      modal: false
    }
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.printMonth = this.printMonth.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount(){
    this.props.dispatch(fetch());
  }
  handleChange(event,key) {
    this.setState({
      [key]: event.target.value
    });
  }
  printMonth() {
    const now = moment();
    const nextMonth = moment(now).add(1, 'months');
    const trips = this.props.trips.filter((trip) => {
      let date = moment(trip.startDate);
      return date.isBetween(now, nextMonth);
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }
  toggle() {
    this.setState({
      toggled: !this.state.toggled
    })
  }
  logout() {
    this.props.dispatch(logout());
  }
  render() {
    const trips = this.props.trips
    .sort((a,b) => new Date(a.startDate) > new Date(b.startDate))
    .map((trip, key) => {
      return (
        <div key={key}>
          <TripCard trip={trip}/>
        </div>
      )
    });
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand to="#">Hi {this.props.user.name}</NavbarBrand>
          <Collapse isOpen={this.state.toggled} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={this.printMonth}>Print Month</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.toggleModal}>Create Trip</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.logout}>Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <CreateTrip isOpen={this.state.modal} toggle={this.toggleModal}/>
        {trips}
      </div>
    )
  }
}

export default connect((store) => {
  return {
    user: store.auth.user,
    trips: store.trips.trips
  }
})(Trips);