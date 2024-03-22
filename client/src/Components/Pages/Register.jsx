import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";

export default function Register() {
  const navigate = useNavigate();
  const[redirect,setRedirect]=useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://recipe-eight-theta.vercel.app/api/register", formData,
        { withCredentials: true }
      );
      alert("Registration successful");
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  };

  if(redirect){
    return <Login />
  }




  return (
    <div className="p-2 w-[400px]">
      <div className="mt-2 mb-6 text-4xl font-semibold text-center">Register</div>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <label className="text-lg font-semibold">Email</label>
          <input
            name="email"
            className="w-[380px] mt-2 p-1 rounded-lg border border-black"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label className="text-lg font-semibold">Username</label>
          <input
            name="username"
            className="w-[380px] mt-2 p-1 rounded-lg border border-black"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label className="text-lg font-semibold">Password</label>
          <input
            name="password"
            className="w-[380px] mt-2 p-1 rounded-lg border border-black"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-10 text-xl font-semibold ">
          <button className="p-3 px-10 text-black transition-all duration-300 ease-in-out bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
