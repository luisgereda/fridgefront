import axios from "axios";
import { recipeApi, auth_detail } from "../../config/constants";

// import { selectEventDetails } from "./selectors";
// import { fetchEvents } from "../../store/events/actions";

export const RECIPE_DETAILS_FETCHED = "RECIPE_DETAILS_FETCHED";

const recipeDetailsFetched = (event) => ({
  type: RECIPE_DETAILS_FETCHED,
  payload: event,
});

export const fetchRecipeById = (recipeId) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${recipeApi}/${recipeId}${auth_detail}`);
    console.log(response);
    dispatch(recipeDetailsFetched(response.data.event));
  };
};
