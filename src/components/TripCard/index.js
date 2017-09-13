import React from 'react';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import './style.css'

function daysBetween(date1, date2) {
  date1 = new Date(new Date(date1).toDateString());
  date2 = new Date(new Date(date2).toDateString());
  return (date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24);
}

const TripCard = (props) => {
  const daysUntil = daysBetween(new Date(), props.trip.startDate);

  let daysUntilCard;
  if(daysUntil > 0) {
    daysUntilCard = <CardSubtitle>{daysUntil} days to go!</CardSubtitle>;
  }else if(daysUntil < 0){
    daysUntilCard = <CardSubtitle>Started {-daysUntil} days ago!</CardSubtitle>;
  }else{
    daysUntilCard = <CardSubtitle>It's happenning today!</CardSubtitle>;
  }

  return (
    <div>
      <Card className="card">
        <CardBlock>
          <CardTitle>{props.trip.destination}</CardTitle>
          {daysUntilCard}
          <CardText>{props.trip.comments}</CardText>
          <Button>Button</Button>
        </CardBlock>
      </Card>
    </div>
  );
};

export default TripCard;