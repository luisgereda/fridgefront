import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Actions and Selectors
// import { fetchRecipePortofolio, fetchRecipeId } from "../../store/recipeDetails/actions";
// import { selectRecipeId, selectAllFavouritesRecipes } from "../../store/recipeDetails/selectors";
// import { selectUser } from "../../store/user/selectors";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  // const recipeId = useSelector(selectRecipeId);
  //const allFavouritesRecipes = useSelector(selectAllFavouritesRecipes)

  //When user come to RecipePortfolio we bring his favourites recipes from localhost
  useEffect(() => {
    dispatch(fetchRecipePortofolio());
  }, []);

  //When user click on recipe card we fetch the recipeId from the API
  useEffect(() => {
    dispatch(fetchRecipeId(recipeId));
  }, []);

  return <div>Hello from Recipe Details</div>;
}
