import React from "react";
import { Link } from "react-router-dom";

export default function ProfilesList(props) {
  return (
    <div>
      <Link to={`/profile/${props.id}`}>
        <img src={props.profileUrl} alt="pic"></img>

        <h2>{props.name}</h2>
      </Link>
    </div>
  );
}
