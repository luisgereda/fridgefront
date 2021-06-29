import React from "react";

export default function RecipeCards(props) {
  return (
    <div>
      <h1>{props.label}</h1>
      <h2>{props.type}</h2>
      <img src={props.image} alt={props.label}></img>
    </div>
  );
}
