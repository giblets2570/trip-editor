import React, { Component } from 'react'
import { connect } from 'react-redux'
import windowSize from 'react-window-size'
import { DateRangePicker } from 'react-dates'
import {
  Row,
  Col,
  Input,
  Label
} from 'reactstrap'

import './style.css'

import { get } from '../../actions/authActions'
import { fetch, updateFilters } from '../../actions/tripsActions'

class Filter extends Component {
  constructor(){
    super()
    this.state = {}
    this.updateDates = this.updateDates.bind(this)
    this.makeSureUserThere = this.makeSureUserThere.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    this.makeSureUserThere()
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
    if(this.props.user.role === 'admin'){
      const user_id = this.props.match ? this.props.match.params.id : null;
      if(user_id){
        const pagesUser = this.props.users.find((user) => user._id === user_id)
        if(!pagesUser){
          this.props.dispatch(get(user_id))
        }
      }
    }
  }
  render() {
    let ifAdmin = null

    if(this.props.user.role === 'admin'){
      const user_id = this.props.match ? this.props.match.params.id : null;
      const pagesUser = this.props.users.find((user) => user._id === user_id)
      if(pagesUser){
        ifAdmin = (<h2 className="ifAdminHeader">Showing trips for {pagesUser.name}</h2>)
      }
    }
    return (
      <Row>
        <Col lg="12">
          {ifAdmin}
        </Col>
        <Col lg="4" xs="12">
          <Label 
            for="DestinationFilter">Search for your destination</Label>
          <Input
            type="text"
            value={this.props.filters.destination}
            name="destinationFilter"
            id="DestinationFilter"
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
    )
  }
}

export default connect((store) => {
  return {
    filters: store.trips.filters,
    user: store.auth.user,
    users: store.auth.users
  }
})(windowSize(Filter))