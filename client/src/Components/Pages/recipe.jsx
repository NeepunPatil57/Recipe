import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { FaRegHeart } from "react-icons/fa";



export default function RecipePage() {
  const token = localStorage.getItem("jwtToken");
  const [response, setResponse] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [display, setDisplay] = useState(false);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(searchTerm);


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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchsearch = async () => {
    try {
      console.log("dwd")
      const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_KEY}&query=${searchTerm}&number=30`, {
      });
      if (res) {
        console.log(res.data);
        setSearchResults(res.data.results);
        setDisplay(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log("search",searchResults);
        


  const getRecipes = async () => {
    try {
      const res = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_KEY}&number=30`, {
      });
      if (res) {
        console.log(res.data);
        setRecipe(res.data.recipes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRecipes();
    getMe();
  }, []);


  return (
    <>
      {response ? (
        <div>
          <Navbar />
          <div className="relative w-60 bottom-14 left-1/3">
            <input
              className="px-3 py-2 pl-10 leading-tight text-gray-800 transition-colors border-2 border-gray-300 rounded-md appearance-none w-60 hover:border-gray-400 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Search..."
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3 -ml-1 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 ml-3 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={fetchsearch}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {display &&(
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2 lg:grid-cols-5">
              {searchResults.map((recipe) => (
                <div key={recipe.id} className="flex flex-col items-center justify-center">
                  <Link to={`/recipe_details/${recipe.id}`} className="flex flex-col justify-between mb-4 overflow-hidden bg-yellow-200 border border-gray-200 rounded-lg shadow-md w-80 h-72">
                    <div className="overflow-hidden rounded-t-lg h-30 w-92">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h1 className="p-4 text-xl font-semibold truncate">{recipe.title}</h1>
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid gap-4 mt-10 grid=cols-1 md:grid-cols-2 lg:grid-cols-5">
            {recipe.map((recipe) => (
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
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-3xl">
            This is a protected route, only <br />
            accessible if you're logged in...
            <Link to="/" className="flex justify-center mt-5">
              <span className="text-sky-600">Click here to login.</span>
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
