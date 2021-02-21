import React from "react";
import { Card } from "react-bootstrap";

const PlantCard = (props) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{props.plantName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.plantType}
        </Card.Subtitle>
        <Card.Text>{props.plantDesc}</Card.Text>
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Remove</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default PlantCard;
