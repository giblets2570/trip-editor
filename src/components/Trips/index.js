import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { Container } from 'reactstrap'

import './style.css'

import TripCard from '../TripCard'
import Navigation from '../Navigation'
import Filter from '../Filter'

import { fetch, updateFilters } from '../../actions/tripsActions'

class Trips extends Component {
  constructor(){
    super()
    this.state = {
      toggled: false,
      modal: false
    }
  }
  componentWillMount(){
    let query = {}
    if(this.props.match.params.id){
      query.user = this.props.match.params.id
    }
    this.props.dispatch(fetch(query))
  }
  render() {
    let trips = this.state.hidePast ?
      this.props.trips.filter((trip) => moment().isBefore(trip.startDate)) :
      this.props.trips.slice(0)

    trips = this.props.filters.destination ? 
      trips.filter((trip) => {
        return trip.destination.toLowerCase().indexOf(this.props.filters.destination.toLowerCase()) !== -1
      }) :
      trips.slice(0)

    trips = this.props.filters.startDate ? 
      trips.filter((trip) => moment(trip.startDate).isSameOrAfter(this.props.filters.startDate)) :
      trips.slice(0)

    trips = this.props.filters.endDate ? 
      trips.filter((trip) => moment(trip.startDate).isSameOrBefore(this.props.filters.endDate)) :
      trips.slice(0)

    trips = trips
    .sort((a,b) => new Date(a.startDate) > new Date(b.startDate))
    .map((trip, key) => {
      return (
        <div key={key}>
          <TripCard trip={trip}/>
        </div>
      )
    })
    return (
      <div>
        <Navigation match={this.props.match}></Navigation>
        <Container className='tripsBody'>
          <Filter match={this.props.match}/>
          {trips}
        </Container>
      </div>
    )
  }
}

export default connect((store) => {
  return {
    trips: store.trips.trips,
    filters: store.trips.filters
  }
})(Trips)