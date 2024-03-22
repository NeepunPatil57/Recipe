import React from 'react'
import Navbar from "./navbar";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";


const Saved = () => {
  const token = localStorage.getItem("jwtToken");
  const [response, setResponse] = useState({ saved: [] });
  const [saved, setSaved] = useState([]);

  const getSaved = async () => {
    try {
      const savedIds = response.saved.join(',');
      const apiUrl = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_KEY}&ids=${savedIds}`;
      const res = await axios.get(apiUrl);

      if (res && res.data) {
        console.log(res.data);
        setSaved(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const getMe = async () => {
    try {
      const res = await axios.get("https://recipe-eight-theta.vercel.app/api/me", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        console.log(res)
        setResponse(res.data);
      }
      if (!res.status === 200) {
        localStorage.removeItem("jwtToken");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  
  useEffect(() => {
    if (response.saved.length > 0) {
      getSaved();
    }
  }, [response.saved]);

  return (
    <div>
      <Navbar />
      <h1 className='p-2 text-lg font-bold md:text-2xl md:p-6'>{response.username}'s Saved Recipes</h1>
      <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2 lg:grid-cols-5">
        {saved.map((recipe) => (
          <div key={recipe.id} className="flex flex-col items-center">
            <Link to={`/recipe_details/${recipe.id}`} className="flex flex-col justify-between mb-4 overflow-hidden bg-yellow-200 border border-gray-200 rounded-lg shadow-md w-80 h-72">
              <div className="overflow-hidden rounded-t-lg h-80 w-92">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold truncate">{recipe.title}</h1>
                <h1 className="font-semibold truncate text-md">Ready In:{recipe.readyInMinutes} Minutes</h1>
                <h1 className="font-semibold text-md">Servings:{recipe.servings}</h1>
                <div className="flex flex-row">
                  <FaRegHeart className="text-2xl text-pink-300" />
                  <h1 className="ml-2 font-semibold truncate text-md">{recipe.aggregateLikes}</h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Saved;



