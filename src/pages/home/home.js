import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
  Jumbotron,
} from "react-bootstrap";
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import RecipeCards from "../../components/recipesCards/recipeCards";

export default function HomeSearch() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState("");

  async function search() {
    const formattedIngredients = ingredients.replace(" ", "%2C%20");
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${formattedIngredients}&app_id=1216562a&app_key=08df7b16f2db218c6bb0b2c412702ed4`
    );
    console.log(response);
    setRecipes(response.data.hits);
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://www.mandarinstone.com/app/uploads/2018/03/Fusion-Light-Grey-Matt-Porcelain-1a-1400x1400.jpg")`,
      }}
    >
      <h1 class="text-center  font-weight-bolder ">
        Welcome to <Badge variant="secondary">Recipe Search</Badge>
      </h1>

      <Jumbotron>
        <Form>
          <Form.Group controlId="formSearchBar">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setIngredients(event.target.value);
              }}
              value={ingredients}
              placeholder="EX: chicken tomatoes mushrooms"
            />
            <Form.Text className="text-muted">
              Type your ingredients with a space in between and get your
              favorite recipe
            </Form.Text>
            <Button size="lg" variant="primary" onClick={search}>
              Search
            </Button>
          </Form.Group>
        </Form>
      </Jumbotron>

      <div>

        <Container>
          <Row>
            {!recipes
              ? null
              : recipes.map((recipe, index) => (
                  <Col>
                    <RecipeCards
                      key={index}
                      label={recipe.recipe.label}
                      image={recipe.recipe.image}
                      type={recipe.recipe.cuisineType}
                    ></RecipeCards>
                  </Col>
                ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
