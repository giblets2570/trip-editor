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
      modal: false
    }
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.printMonth = this.printMonth.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  printMonth() {
    const now = moment();
    const nextMonth = moment(now).add(1, 'months');
    const trips = this.props.trips.filter((trip) => {
      let date = moment(trip.startDate);
      return date.isBetween(now, nextMonth);
    });
    console.log(trips);
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

    let navItems = [];
    switch(this.props.user.role) {
      case "user": {
        navItems.push(<NavLink href="#" onClick={this.printMonth}>Print Month</NavLink>);
        navItems.push(<NavLink href="#" onClick={this.toggleModal}>Create Trip</NavLink>);
        navItems.push(<NavLink href="#" onClick={this.logout}>Logout</NavLink>);
        break;
      }
      case "manager": {
        navItems.push(<NavLink href="#" onClick={this.toggleModal}>Create User</NavLink>);
        navItems.push(<NavLink href="#" onClick={this.logout}>Logout</NavLink>);
        break;
      }
      case "admin": {
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
        <CreateTrip isOpen={this.state.modal} toggle={this.toggleModal}/>
        <CreateUser isOpen={this.state.modal} toggle={this.toggleModal}/>
      </div>
    )
  }
}

export default connect((store) => {
  return {
    user: store.auth.user
  }
})(Navigation);