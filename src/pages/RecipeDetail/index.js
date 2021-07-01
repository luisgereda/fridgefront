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
import { addRecipeFavourite } from "../../store/user/actions";
import {
  selectFavouritesRecipes,
  selectToken,
} from "../../store/user/selectors";

export default function RecipeDetail() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  console.log("what is token", token);

  const { recipeId } = useParams();
  console.log("what is recipeId", recipeId, typeof recipeId);

  const recipe = useSelector(selectRecipebyId);
  // console.log("what is data", recipe);

  const favouritesRecipes = useSelector(selectFavouritesRecipes);
  console.log("what is favouritesRecipes", favouritesRecipes);

  useEffect(() => {
    // console.log("I got a dispatch");
    dispatch(fetchRecipeById(recipeId));
  }, [dispatch, recipeId]);

  if (!recipe.uri) {
    return "Loading...";
  }

  // get recipeId values of the favourite object into an array.
  // const arrFavourites = favouritesRecipes.map((recipe) => recipe.recipeId);
  // console.log("what arrFavourites?", arrFavourites);

  //check if the actual recipe is included in the array
  // const isFavourite = arrFavourites.includes(recipeId);
  // console.log("what isFavourite?", isFavourite); //true or false

  const isFavourite = favouritesRecipes
    .map((recipe) => recipe.recipeId)
    .includes(recipeId);
  console.log("what isFavourite?", isFavourite);

  // const isFavourite = favouritesRecipes.map((recipe) => {
  //   return recipe.recipeId.includes(recipeId);
  // });
  // console.log("what isFavourite?", isFavourite); //[true, false, false]

  // const isFavourite = favouritesRecipes.filter(
  //   (recipe) => recipe.recipeId === recipeId
  // );
  // console.log("what isFavourite?", isFavourite); //[{...}]

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
          {/* {favouritesRecipes.map((recipe, index) => {
            return (
              <div key={index}>
                <Button>{id.includes(recipe.recipeId) ? "♥" : "♡"}</Button>
              </div>
            );
          })} */}
          {token ? (
            <Button>
              {favouritesRecipes
                .map((recipe) => recipe.recipeId)
                .includes(recipeId)
                ? "♥"
                : "♡"}
            </Button>
          ) : null}
          <Button onClick={() => dispatch(addRecipeFavourite(recipeId))}>
            add
          </Button>

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
