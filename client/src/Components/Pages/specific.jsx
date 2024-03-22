import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Specific = () => {
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  console.log(id);
  const [details, setDetails] = useState(null);

  const getspecific = async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_KEY}`
      );
      if (res) {
        console.log(res.data);
        setDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const save_recipe = async () => {
    try {
      const res = await axios.get(
        `http://recipe-eight-theta.vercel.app/api/save-recipe/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        toast("Recipe already saved", { type: "info" });
      }
      if (res.status === 200) {
        console.log(res);
        toast.success("Recipe Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    getspecific();
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
      />
      <div className="flex flex-col items-center justify-start h-screen">
        <div className="h-auto p-2 mt-10 bg-yellow-500 rounded-md md:p-5">
          <div className="bg-yellow-200 rounded-md">
            {details ? (
              <div className="p-6">
                <div className="flex flex-row items-center justify-center mb-4 text-2xl font-semibold md:text-4xl">
                  <h1>{details.title}</h1>
                  <MdOutlineLibraryAdd
                    className="ml-10 md:text-3xl text:lg text-sky-500"
                    onClick={() => save_recipe()}
                  />
                </div>
                <h1 className="font-semibold text-center text:md md:text-2xl">
                  Time Required To Prepare:{details.readyInMinutes}
                  <span className="ml-2">Minutes</span>
                </h1>
                <div className="flex flex-row items-center justify-center font-semibold text:md md:text-2xl">
                  <h1 className="mr-6">Servings:{details.servings}</h1>
                  <h1>Liked By:</h1>
                  <FaRegHeart className="text-pink-300 md:text-3xl text:lg" />
                  <h1 className="ml-2 font-semibold truncate text-md">
                    {details.aggregateLikes}
                  </h1>
                </div>

                <div className="mt-5 text-sm font-semibold text-center md:text-lg">
                  Dish Types:
                  <ul className="inline p-0 text-center list-none">
                    {details.dishTypes &&
                      details.dishTypes.map((dishType, index) => (
                        <li key={index} className="inline mx-2">
                          {dishType}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center mt-5">
                  <div className="mr-5 h-72" style={{ Width: "24rem" }}>
                    <img
                      src={details.image}
                      alt={details.title}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <p className="items-start text-start text:sm md:text-md w-96">
                    <h1 className="mb-2 font-bold text:lg md:text-2xl">Instructions</h1>
                    {truncateText(details.instructions, 60)}
                  </p>
                </div>
                <div className="mt-5 font-semibold text-center text:lg md:text-2xl">
                  Ingredients:
                  <div className="grid grid-cols-1 gap-4 mt-4 justify-">
                    {details.extendedIngredients &&
                      details.extendedIngredients.map((ingredient, index) => (
                        <div key={index} className="flex items-start ">
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            alt={ingredient.name}
                            className="w-20 h-20 mr-2"
                          />
                          <span className="mt-6">{ingredient.original}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specific;
