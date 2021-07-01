import axios from "axios";
import { apiUrl } from "../../config/constants";

export const PROFILE_DETAILS_FETCHED = "PROFILE_DETAILS_FETCHED";

const recipeDetailsFetched = (event) => ({
  type: PROFILE_DETAILS_FETCHED,
  payload: event,
});

export const fetchRecipesById = (id) => {
  return async (dispatch, getState) => {

    const response = await axios.get(`${apiUrl}/getrecipes/${id}`);
    const responseClean = response.data

    dispatch(recipeDetailsFetched(responseClean));
  };
};