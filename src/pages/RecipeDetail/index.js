import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Actions and Selectors
import { fetchRecipeById } from "../../store/recipeDetail/actions";
import { selectRecipebyId } from "../../store/recipeDetail/selectors";

import data from "../RecipeDetail/recipeId.json";

const recipe = data.recipe;
console.log(recipe);

export default function RecipeDetail() {
  // const dispatch = useDispatch();
  // const { recipeId } = useParams();
  // const recipe = useSelector(selectRecipebyId);

  // useEffect(() => {
  //   dispatch(fetchRecipeId(recipeId));
  // }, []);

  if (!recipe.uri) {
    return "Loading...";
  }

  return (
    <div className="container">
      <div>
        <img src={recipe.image} alt={recipe.label} />
        <h4>{recipe.label}</h4>
        <hr />
        <h5>{recipe.ingredients.length} ingredients</h5>
        <ul>
          {recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient.text}</li>;
          })}
        </ul>
        <hr />
        <h5>Preparation</h5>
        <a href={recipe.url} target="_blank">
          <button className="btn btn-success">Instructions</button>
        </a>
      </div>
    </div>
  );
}
