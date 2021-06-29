import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCards(props) {
  return (
    <div>
      <h1>{props.label}</h1>
      <h2>{props.type}</h2>
      <Link to={`/recipe/${props.id}`}>
        <img src={props.image} alt={props.label}></img>
      </Link>
    </div>
  );
}
