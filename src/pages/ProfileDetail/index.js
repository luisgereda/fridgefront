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
// import { fetchRecipeById } from "../../store/recipeDetail/actions"

// import {
//   Button,
//   Alert,
//   Container,
//   Row,
//   Image,
//   ListGroup,
// } from "react-bootstrap";

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

  // const starClick = (nextValue, prevValue, name) => (
  //   setStars(nextValue)
  //   );

  return (
    <div>
      {isOwnProfile
        ? "You an edit your favourites => you're on your own profile page"
        : null}

      <p>
        Profile: picUrl: {favRecipes.userPic} name: {favRecipes.userName}
      </p>

      <p>
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
                  <StarRatingComponent name={"Stars"} value={fav.stars} />{" "}
                </div>
              );
            })}
      </p>
    </div>
  );
}
