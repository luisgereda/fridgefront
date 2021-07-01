import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfilesList from "../../components/profiles/profiles";
import {
  Button,
  Alert,
  Container,
  Row,
  Image,
  ListGroup,
} from "react-bootstrap";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function getProfiles() {
      try {
        const response = await axios.get("http://localhost:4000/profiles");
        console.log(response);
        setProfiles(response.data.profiles);
      } catch (e) {
        console.log(e);
      }
    }
    getProfiles();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url("https://www.mandarinstone.com/app/uploads/2018/03/Fusion-Light-Grey-Matt-Porcelain-1a-1400x1400.jpg")`,
      }}
    >
      <Container>
        <ListGroup as="ul">
          {profiles?.map((profile) => (
            <ListGroup.Item>
              <ProfilesList
                key={profile.id}
                id={profile.id}
                name={profile.name}
                profileUrl={profile.profileUrl}
              ></ProfilesList>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}
