import axios from "axios";
import { recipeApi, auth_detail } from "../../config/constants";

// import { selectEventDetails } from "./selectors";
// import { fetchEvents } from "../../store/events/actions";

export const RECIPE_DETAILS_FETCHED = "RECIPE_DETAILS_FETCHED";

const recipeDetailsFetched = (event) => ({
  type: RECIPE_DETAILS_FETCHED,
  payload: event,
});

export const fetchRecipeById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${recipeApi}/${id}${auth_detail}`);
    console.log("what is response", response.data.recipe);
    dispatch(recipeDetailsFetched(response.data.recipe));
  };
};
