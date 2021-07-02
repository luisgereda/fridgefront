import axios from "axios"
import React from 'react'
import { useEffect, useState } from "react"

export default function Joke() {
    const [joke, setJoke] = useState("");

    useEffect(() => {
      async function getJoke() {
        try {
            const response = await axios.get("https://api.spoonacular.com/food/jokes/random/?apiKey=27791deb4caa453b8138f9aea2b8dc0b")
            const joke = response.data.text

            console.log("Joke:", joke)

          setJoke(joke);
        } catch (error) {
          console.log(error.message);
        }
      }
      getJoke();
    }, []);

    if (!joke) {
        return "Loading.."
    }
  

    return (
        <div>
            <p>
               {joke}
            </p>
        </div>
    )
}

