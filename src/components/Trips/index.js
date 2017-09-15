import React, { Component } from 'react'
import { connect } from 'react-redux'
import windowSize from 'react-window-size';
import moment from 'moment'

import {
  Container,
  Row,
  Col,
  Input,
  Label
} from 'reactstrap'

import './style.css'

import CreateTrip from '../CreateTrip'
import TripCard from '../TripCard'
import Navigation from '../Navigation'

import { DateRangePicker } from 'react-dates'
import { get } from '../../actions/authActions'
import { fetch, updateFilters } from '../../actions/tripsActions'

class Trips extends Component {
  constructor(){
    super();
    this.state = {
      toggled: false,
      modal: false
    }
    this.updateDates = this.updateDates.bind(this);
  }
  componentWillMount(){
    let query = {};
    if(this.props.match.params.id){
      query.user = this.props.match.params.id;
    }
    this.props.dispatch(fetch(query));
    this.makeSureUserThere();
  }
  handleChange(event,key) {
    const newFilters = {...this.props.filters, destination: event.target.value}
    this.props.dispatch(updateFilters(newFilters))
  }
  updateDates(startDate, endDate) {
    const newFilters = {...this.props.filters, startDate, endDate}
    this.props.dispatch(updateFilters(newFilters))
  }
  makeSureUserThere() {
    if(this.props.user.role == 'admin'){
      const pagesUser = this.props.users.find((user) => user._id == this.props.match.params.id);
      if(!pagesUser){
        this.props.dispatch(get(this.props.match.params.id));
      }
    }
  }
  render() {

    let ifAdmin = null;

    if(this.props.user.role == 'admin'){
      const pagesUser = this.props.users.find((user) => user._id == this.props.match.params.id);
      if(pagesUser){
        ifAdmin = (<h2>Showing trips for {pagesUser.name}</h2>)
      }
    }

    let trips = this.state.hidePast ?
      this.props.trips.filter((trip) => moment().isBefore(trip.startDate)) :
      this.props.trips.slice(0);

    trips = this.props.filters.destination ? 
      trips.filter((trip) => {
        return trip.destination.toLowerCase().indexOf(this.props.filters.destination.toLowerCase()) !== -1
      }) :
      trips.slice(0);

    trips = this.props.filters.startDate ? 
      trips.filter((trip) => moment(trip.startDate).isSameOrAfter(this.props.filters.startDate)) :
      trips.slice(0);

    trips = this.props.filters.endDate ? 
      trips.filter((trip) => moment(trip.startDate).isSameOrBefore(this.props.filters.endDate)) :
      trips.slice(0);

    trips = trips
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
        <Navigation pathname={this.props.location.pathname}></Navigation>
        {ifAdmin}
        <Container className='tripsBody'>
          <Row>
            <Col lg="4" xs="12">
              <Label 
                for="Destination">Search for your destination</Label>
              <Input
                type="text"
                value={this.props.filters.destination}
                name="destinationFilter"
                id="Destination"
                onChange={(e) => this.handleChange(e)}
                placeholder="Paris" />
            </Col>
            <Col lg="4" xs="12">
              <Label 
                for="Range">Only show trips that start between dates</Label>
              <br/>
              <DateRangePicker
                startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                displayFormat="DD/MM/YYYY"
                onDatesChange={({ startDate, endDate }) => this.updateDates(startDate, endDate)} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                withFullScreenPortal={this.props.windowWidth < 768}
                orientation={this.props.windowWidth < 768 ? "vertical" : "horizontal"}
              />
            </Col>
            <Col lg="4" xs="12">
              <Label check>
                <Input 
                  type="checkbox" 
                  onClick={() => this.setState({hidePast: !this.state.hidePast})}/>{' '}
                Hide trips that are in the past
              </Label>
            </Col>
          </Row>
          {trips}
        </Container>
      </div>
    )
  }
}

export default connect((store) => {
  return {
    trips: store.trips.trips,
    filters: store.trips.filters,
    user: store.auth.user,
    users: store.auth.users
  }
})(windowSize(Trips));