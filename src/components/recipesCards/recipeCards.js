import React from "react";
import { Button, Card, Container } from "react-bootstrap";
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
            <Link to={`/recipe/${props.id}`}>
              <Button variant="info">Go to Details Page</Button>{" "}
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
