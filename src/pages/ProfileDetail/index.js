import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import { selectFavouritesById } from "../../store/profileDetail/selectors";
import { fetchRecipesById } from "../../store/profileDetail/actions";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { rating } from "../../store/user/actions";
import { selectRecipes } from "../../store/user/selectors";

import {
  Badge,
  Alert,
  Container,
  Button,
  Row,
  Image,
  Card,
} from "react-bootstrap";

export default function ProfileDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = useSelector(selectUser);
  const favRecipes = useSelector(selectFavouritesById);

  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(fetchRecipesById(id));
  }, [dispatch, id]);

  const isOwnProfile = userData.id === parseInt(id);

  if (!favRecipes.recipes) {
    return "Loading...";
  }
  console.log("Favourites : ", favRecipes);

  return (
    <div
      style={{
        backgroundImage: `url("https://www.mandarinstone.com/app/uploads/2018/03/Fusion-Light-Grey-Matt-Porcelain-1a-1400x1400.jpg")`,
      }}
    >
      {isOwnProfile
        ? "You an edit your favourites => you're on your own profile page"
        : null}

      <Container>
        <Row>
          <Card style={{ width: "18rem" }}>
            <Card.Img src={favRecipes.userPic} alt="{props.label}" />
            <Card.Body className="bg-info">
              <Card.Title>{favRecipes.userName}</Card.Title>
            </Card.Body>
          </Card>

          {isOwnProfile
            ? recipes.map((recipes) => {
                return (
                  <div key={recipes.id}>
                    <img src={recipes.recipePic} alt={recipes.recipeName}></img>
                    <p>{recipes.recipeName}</p>
                    <Link to={`/recipe/${recipes.recipeId}`}>Details here</Link>

                    <StarRatingComponent
                      name={"Stars"}
                      value={recipes.stars}
                      onStarClick={(nextValue, prevValue, name) =>
                        dispatch(rating(recipes.id, nextValue))
                      }
                    />
                  </div>
                );
              })
            : favRecipes.recipes.map((fav) => {
                return (
                  <div key={fav.id}>
                    <img src={fav.recipePic} alt={fav.recipeName}></img>
                    <p>{fav.recipeName}</p>
                    <Link to={`/recipe/${fav.recipeId}`}>Details here</Link>
                    <StarRatingComponent
                      name={"Stars"}
                      value={fav.stars}
                    />{" "}
                  </div>
                );
              })}
        </Row>
      </Container>
    </div>
  );
}
