import React, {Component} from 'react'

import { connect } from 'react-redux'

import moment from 'moment'

import { 
  Card, CardText, CardBlock, CardHeader, Button, CardFooter,
  Row, Col, Container
} from 'reactstrap'

import CreateTrip from '../CreateTrip'

import './style.css'

function daysBetween(date1, date2) {
  date1 = moment(new Date(date1).toDateString())
  date2 = moment(new Date(date2).toDateString())
  return date1.diff(date2, 'days')
}

class TripCard extends Component {
  constructor() {
    super()
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
  }
  toggleEdit(){
    this.setState({
      editing: !this.state.editing
    })
  }
  render() {
    const daysUntil = daysBetween(this.props.trip.startDate, new Date())

    let daysUntilCard
    if(daysUntil > 0) {
      daysUntilCard = `${daysUntil} day${daysUntil===0?"":"s"} away`
    }else if(daysUntil === 0){
      daysUntilCard = `It's happenning today!`
    }
    return (
      <div>
        <Card className="card">
          <CardHeader tag="h3">
            {this.props.trip.destination}
          </CardHeader>
          <CardBlock>
            <Container>
              <Row>
                <Col md="8" xs="12">
                  <CardText>
                    <b>Comment:</b> {this.props.trip.comments}
                  </CardText>   
                </Col>
                <Col md="4" xs="12">
                  <CardText>   
                    <b>Dates:</b> {moment(this.props.trip.startDate).format('DD/MM/YY')} - {moment(this.props.trip.endDate).format('DD/MM/YY')}
                  </CardText>   
                </Col>
              </Row>
            </Container>
          </CardBlock>
          <CardFooter>
            <Button onClick={this.toggleEdit}>Edit</Button>
            <span style={{float: "right"}}>
              {daysUntilCard}
            </span>
          </CardFooter>
        </Card>
        <CreateTrip isOpen={this.state.editing} toggle={this.toggleEdit} trip={this.props.trip}/>
      </div>
    )
  }
}

export default connect()(TripCard)