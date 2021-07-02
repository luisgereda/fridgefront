import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Image } from "react-bootstrap";

export default function ProfilesList(props) {
  return (
    <div>
      <Link to={`/profile/${props.id}`}>
        <Image
          src={props.profileUrl}
          alt="pic"
          width="100"
          height="100"
        ></Image>

        <Breadcrumb>{props.name}</Breadcrumb>
      </Link>
    </div>
  );
}
