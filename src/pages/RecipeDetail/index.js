import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Button,
  Alert,
  Container,
  Row,
  Image,
  ListGroup,
} from "react-bootstrap";

//Actions and Selectors
import { fetchRecipeById } from "../../store/recipeDetail/actions";
import { selectRecipebyId } from "../../store/recipeDetail/selectors";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log("what is id", id);
  const recipe = useSelector(selectRecipebyId);
  // console.log("what is data", recipe);

  useEffect(() => {
    // console.log("I got a dispatch");
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (!recipe.uri) {
    return "Loading...";
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://www.mandarinstone.com/app/uploads/2018/03/Fusion-Light-Grey-Matt-Porcelain-1a-1400x1400.jpg")`,
      }}
    >
      <div className="container">
        <Container>
          <Row>
            <Image src={recipe.image} rounded alt={recipe.label} />
            <Alert
              className="font-weight-bolder text-uppercase"
              variant="success"
            >
              {recipe.label}
            </Alert>
          </Row>
          <hr />
          <ListGroup as="ul" variant="flush">
            <ListGroup.Item className="font-weight-bolder text-uppercase">
              {recipe.ingredients.length} ingredients
            </ListGroup.Item>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <ListGroup.Item as="li" active key={index}>
                  {ingredient.text}
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          <hr />
          <Alert className="font-weight-bolder text-uppercase" variant="danger">
            Preparation
          </Alert>
          <a href={recipe.url} target="_blank">
            <Button className="btn btn-success">Instructions</Button>
          </a>
        </Container>
      </div>
    </div>
  );
}
