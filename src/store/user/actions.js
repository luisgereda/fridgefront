import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectFavouritesRecipes, selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const RECIPE_FAVOURITE_POSTED = "RECIPE_FAVOURITE_POSTED";
export const RECIPE_FAVOURITE_DELETED = "RECIPE_FAVOURITE_DELETED";


const recipeFavouritePosted = (event) => ({
  type: RECIPE_FAVOURITE_POSTED,
  payload: event,
});

const recipeFavouriteDeleted = (event) => ({
  type: RECIPE_FAVOURITE_DELETED,
  payload: event,
});

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const newRating = (id, stars) => {
  return {
    type: "recipes/newRating",
    payload: { id, stars },
  };
};

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password, profileUrl) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    console.log(name, email, password, profileUrl);
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,

        profileUrl,

      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};


// export const addRecipeFavourite = (recipeId) => {
//   return async (dispatch, getState) => {
//     const { id } = selectUser(getState());
//     const userId = id;

//     const response = await axios.post(`${apiUrl}/addrecipe`, {
//       recipeId,
//       userId,
//     });
//     console.log("what is response", response);
//     dispatch(recipeFavouritePosted(response));
//   };
// };

export const checkFavorite = (recipeId, recipePic, recipeName) => {
  return async (dispatch, getState) => {
    const favourite = selectFavouritesRecipes(getState());
    console.log("what is favourite", favourite);
    const { id } = selectUser(getState());
    const userId = id;

    if (favourite.map((recipe) => recipe.recipeId).includes(recipeId)) {
      //if the recipe is already in favourites lets remove
      const token = selectToken(getState())
      const response = await axios.delete(`${apiUrl}/deleterecipe/${recipeId}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        },
      },
      );
      
      console.log("what is deleterecipe response", response);

      dispatch(recipeFavouriteDeleted());
    } else {
      //else lets add it to favourites list
      const response = await axios.post(`${apiUrl}/addrecipe`, {
        recipeId,
        recipePic,
        recipeName,
        userId,
      });
      console.log("what is addrecipe response", response.data.addRecipe);

      dispatch(recipeFavouritePosted(response.data.addRecipe));
    }
  };
};

// export const toggleFavorite = (recipeId) => ({
//   type: "user/toggleFavorite",
//   payload: recipeId,
// });


export const rating = (id, stars) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.patch(
        `${apiUrl}/ratings`,
        { id, stars },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.id, response.data.stars);
      dispatch(newRating(response.data.id, response.data.stars));
    } catch (e) {
      console.log(e);
    }
  };
};
