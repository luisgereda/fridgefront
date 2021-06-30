import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfilesList from "../../components/profiles/profiles";

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
    <div>
      {profiles?.map((profile) => (
        <ProfilesList
          key={profile.id}
          id={profile.id}
          name={profile.name}
          profileUrl={profile.profileUrl}
        ></ProfilesList>
      ))}
    </div>
  );
}
