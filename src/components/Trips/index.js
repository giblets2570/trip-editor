import React, { Component } from 'react';

import { connect } from 'react-redux'

class Trips extends Component {
  render(){
    return (
      <h1>Trips</h1>
    )
  }
}

export default connect()(Trips);