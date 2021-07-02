import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  RECIPE_FAVOURITE_POSTED,
  RECIPE_FAVOURITE_DELETED,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  recipes: [],
  profileUrl: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case RECIPE_FAVOURITE_POSTED:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case RECIPE_FAVOURITE_DELETED:
      console.log("what is payload deleted?", action.payload);
      const checkRecipeId = action.payload;
      const newRecipes = state.recipes.filter(
        (recipe) => recipe.recipeId !== checkRecipeId
      );
      console.log("what is newFavourite?", newRecipes);
      return {
        ...state,
        ...state.recipes,
        recipes: newRecipes,
      };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
