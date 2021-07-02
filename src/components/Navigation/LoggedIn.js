import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      {/* <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item> */}
      <Link to={`/profile/${user.id}`}>
        <Image src={user.profileUrl} rounded alt="profile pic" width="5%" />
      </Link>

      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
