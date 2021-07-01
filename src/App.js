import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";
import HomeSearch from "./pages/home/home";
import RecipeDetail from "./pages/RecipeDetail";
import Profiles from "./pages/Profiles/profiles";
import ProfileDetail from "./pages/ProfileDetail"
// const Home = () => (
//   <Jumbotron>
//     <h1>Home</h1>
//   </Jumbotron>
// );
const Other = () => (
  <Jumbotron>
    <h1>Other</h1>
  </Jumbotron>
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomeSearch} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/recipe/:recipeId" component={RecipeDetail} />
        <Route path="/profile/:id" component={ProfileDetail} />
      </Switch>
    </div>
  );
}

export default App;
