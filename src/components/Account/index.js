import React, { Component } from 'react';

import { connect } from 'react-redux'

class Account extends Component {
  render(){
    return (
      <h1>Account</h1>
    )
  }
}

export default connect()(Account);