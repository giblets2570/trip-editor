import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

import CreateTrip from '../CreateTrip'
import CreateUser from '../CreateUser'

import { logout } from '../../actions/authActions'

class Navigation extends Component {
  constructor(){
    super();
    this.state = {
      toggled: false,
      tripModal: false,
      userModal: false
    }
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.printMonth = this.printMonth.bind(this);
    this.toggleTripModal = this.toggleTripModal.bind(this);
  }
  printMonth() {
    const now = moment();
    const nextMonth = moment(now).add(1, 'months');
    const trips = this.props.trips.filter((trip) => {
      let date = moment(trip.startDate);
      return date.isBetween(now, nextMonth);
    });
  }
  toggleTripModal() {
    this.setState({
      tripModal: !this.state.tripModal
    })
  }
  toggleUserModal() {
    this.setState({
      userModal: !this.state.userModal
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

    let navItems = [];
    switch(this.props.user.role) {
      case "user": {
        navItems.push(<NavLink href="#" onClick={this.printMonth}>Print Month</NavLink>);
        navItems.push(<NavLink href="#" onClick={this.toggleTripModal}>Create Trip</NavLink>);
        navItems.push(<NavLink href="#" onClick={this.logout}>Logout</NavLink>);
        break;
      }
      case "manager": {
        navItems.push(<NavLink href="#" onClick={this.toggleUserModal}>Create User</NavLink>);
        navItems.push(<NavLink href="#" onClick={this.logout}>Logout</NavLink>);
        break;
      }
      case "admin": {
        if(this.props.match){
          if(this.props.match.path.indexOf('trips') !== -1){
            navItems.push(<NavLink href="#" onClick={this.toggleTripModal}>Create Trip</NavLink>);
          }else{
            navItems.push(<NavLink href="#" onClick={this.toggleUserModal}>Create User</NavLink>);
          }
        }
        navItems.push(<NavLink href="#" onClick={this.logout}>Logout</NavLink>);
        break;
      }
      default: {
        break;
      }
    }

    navItems = navItems.map((item, index) => (
      <NavItem key={index}>{item}</NavItem>
    ))

    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand to="#">Trippr {this.props.user.name ? `| Hi ${this.props.user.name}` : ""}</NavbarBrand>
          <Collapse isOpen={this.state.toggled} navbar>
            <Nav className="ml-auto" navbar>
              {navItems}
            </Nav>
          </Collapse>
        </Navbar>
        <CreateTrip isOpen={this.state.tripModal} toggle={this.toggleTripModal} for={this.props.match.params.id}/>
        <CreateUser isOpen={this.state.userModal} toggle={this.toggleUserModal}/>
      </div>
    )
  }
}

export default connect((store) => {
  return {
    user: store.auth.user,
    trips: store.trips.trips
  }
})(Navigation);