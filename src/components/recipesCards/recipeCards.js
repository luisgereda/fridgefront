import React from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function RecipeCards(props) {
  return (
    <div>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img src={props.image} alt={props.label} />
          <Card.Body>
            <Card.Title>{props.label}</Card.Title>
            <Card.Text>Type: {props.type}</Card.Text>
            <Button variant="info">Go to Details Page</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
