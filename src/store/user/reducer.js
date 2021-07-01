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
      console.log("action.payload", action.payload);
      return {
        ...state,
        ...state.recipe,
        recipes: [state.recipe, action.payload],
      };

    case RECIPE_FAVOURITE_DELETED:
      return state;

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
