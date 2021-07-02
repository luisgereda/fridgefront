import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import { selectFavouritesById } from "../../store/profileDetail/selectors";
import { fetchRecipesById } from "../../store/profileDetail/actions";
import { Link } from "react-router-dom";
// import { fetchRecipeById } from "../../store/recipeDetail/actions"

import {
  Button,
  Badge,
  Alert,
  Container,
  Row,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";

export default function ProfileDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = useSelector(selectUser);
  const favRecipes = useSelector(selectFavouritesById);

  useEffect(() => {
    dispatch(fetchRecipesById(id));
  }, [dispatch, id]);

  const isOwnProfile = userData.id === parseInt(id);

  if (!favRecipes.recipes) {
    return "Loading...";
  }
  console.log("Favourites : ", favRecipes);

  return (
    <div
      style={{
        backgroundImage: `url("https://www.mandarinstone.com/app/uploads/2018/03/Fusion-Light-Grey-Matt-Porcelain-1a-1400x1400.jpg")`,
      }}
    >
      <Container>
        {isOwnProfile
          ? "You an edit your favourites => you're on your own profile page"
          : null}

        <Alert variant="info">
          <Image
            src={favRecipes.userPic}
            alt={favRecipes.userName}
            width="100"
            height="100"
          />
          <Badge>{favRecipes.userName}</Badge>
        </Alert>

        <p>
          <Container>
            <Row>
              {favRecipes.recipes.map((fav) => {
                return (
                  <Card key={fav.id} style={{ width: "18rem" }}>
                    <Card.Img src={fav.recipePic} alt={fav.recipeName} />
                    <Card.Body>
                      <Card.Title>{fav.recipeName}</Card.Title>
                      <Link to={`/recipe/${fav.recipeId}`}>Details here</Link>
                    </Card.Body>
                  </Card>
                );
              })}{" "}
            </Row>
          </Container>
        </p>
      </Container>
    </div>
  );
}
