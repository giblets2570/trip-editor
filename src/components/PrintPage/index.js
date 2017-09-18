import React, { Component } from 'react'
import PrintTemplate from 'react-print'

import TripCard from '../TripCard'

import { connect } from 'react-redux'

class PrintPage extends Component {
  render() {
    let trips = this.props.trips.map((trip, key) => {
      return (
        <div key={key}>
          <TripCard trip={trip}/>
        </div>
      )
    })
    return (
      <PrintTemplate>
        <br/>
        <h2>Travel plan for next month.</h2>
        {trips}
      </PrintTemplate>
    )
  }
}

export default connect((store) => {
  return {
    trips: store.trips.printTrips,
  }
})(PrintPage)