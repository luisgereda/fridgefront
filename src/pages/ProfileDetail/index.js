import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/selectors"
import { selectFavouritesById } from "../../store/profileDetail/selectors"
import { fetchRecipesById } from "../../store/profileDetail/actions"
import { Link } from "react-router-dom"
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

  const userData = useSelector(selectUser)
  const favRecipes = useSelector(selectFavouritesById)

  useEffect(() => {
    dispatch(fetchRecipesById(id));
  }, [dispatch, id]);

  const isOwnProfile = userData.id === parseInt(id)

  if (!favRecipes.recipes) {
    return "Loading...";
  }
  console.log("Favourites : ", favRecipes)


  return (
    <div>{isOwnProfile ? 
      "You an edit your favourites => you're on your own profile page" : 
      null}

      <p><img src={favRecipes.userPic} alt={favRecipes.userName} width="50" height="50" />
       {favRecipes.userName}</p>

      <p>
        {favRecipes.recipes.map(fav => {
        return (
          <div key={fav.id}>
            <p> <img src={fav.recipePic} alt={fav.recipeName} width="100" height="100" /></p>
            <p>{fav.recipeName}</p>
            <Link to={`/recipe/${fav.recipeId}`}>Details here</Link>

          </div>
        )
         })}
      </p>
    </div>
  );
}