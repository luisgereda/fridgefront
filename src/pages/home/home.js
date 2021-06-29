import React from "react";
import { useState } from "react";
import axios from "axios";
import RecipeCards from "../../components/recipesCards/recipeCards";

export default function HomeSearch() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState("");

  async function search() {
    const formattedIngredients = ingredients.replace(" ", "%2C%20");
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${formattedIngredients}&app_id=1216562a&app_key=08df7b16f2db218c6bb0b2c412702ed4`
    );
    console.log(response);
    setRecipes(response.data.hits);
  }

  return (
    <div>
      <header>Welcome to the recipe search</header>
      <h1>
        Type your ingredients with a space in between and get your favorite
        recipe:
      </h1>
      <input
        type="text"
        onChange={(event) => {
          setIngredients(event.target.value);
        }}
        value={ingredients}
        placeholder="EX: chicken tomatoes mushrooms"
      ></input>
      <button onClick={search}>Search</button>
      <div>
        {!recipes
          ? "no data"
          : recipes.map((recipe, index) => (
              <RecipeCards
                key={index}
                label={recipe.recipe.label}
                image={recipe.recipe.image}
                type={recipe.recipe.cuisineType}
              ></RecipeCards>
            ))}
      </div>
    </div>
  );
}
