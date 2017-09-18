import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetch } from '../../actions/authActions'

import UserCard from '../UserCard'
import Navigation from '../Navigation'

import './style.css'

class Users extends Component {
  componentWillMount(){
    this.props.dispatch(fetch());
  }
  render(){
    const users = this.props.users.map((user, key) => {
      return <UserCard key={key} user={user}/>
    })
    return (
      <div>
        <Navigation match={this.props.match}></Navigation>
        <div className="usersBody">
          {users}
        </div>
      </div>
    )
  }
}

export default connect((store) => {
  return {
    users: store.auth.users
  }
})(Users);