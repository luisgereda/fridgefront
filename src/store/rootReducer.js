import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import recipeDetail from "./recipeDetail/reducer";

export default combineReducers({
  appState,
  user,
  recipeDetail,
});
