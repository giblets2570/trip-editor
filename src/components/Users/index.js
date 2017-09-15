import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { logout } from '../../actions/authActions'

class Users extends Component {
  constructor(){
    super();
  }
  render(){
    return (
      <h1>Fighting</h1>
    )
  }
}

export default connect((store) => {
  return {
    user: store.auth.user,
    trips: store.trips.trips,
    filters: store.trips.filters
  }
})(Users);