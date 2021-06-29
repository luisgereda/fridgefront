import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
