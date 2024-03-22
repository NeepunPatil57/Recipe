import React, { useState,useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";

export default function Home() {
  const [page, setPage] = useState("login");
  const token = localStorage.getItem("jwtToken");

  const getMe = async () => {
    try {
      const res = await axios.get("http://recipe-eight-theta.vercel.app/api/me", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.status === 200) {
        localStorage.removeItem("jwtToken");
      }else{
        window.location.href="/recipe"
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const handlePageChange = () => {
    if (page === "register") {
      setPage("login");
    } else {
      setPage("register");
    }
  };
  console.log(page);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-auto p-5 transition duration-300 ease-in-out bg-yellow-200 shadow-lg rounded-3xl hover:scale-105">
        <div>{page === "register" ? <Register /> : <Login />}</div>
        <Link onClick={handlePageChange}>
          <div className="mt-5 mb-2 text-lg text-center">
            {page === "register"
              ? "Already have an account?"
              : "Don't have an account?"}

            <span className="text-sky-600"> Click here.</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
