import React, { useState } from "react";
import axios from "axios";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://recipe-eight-theta.vercel.app/api/login", formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const jwtToken = response.headers["authorization"].replace('Bearer ', '');

        localStorage.setItem("jwtToken", jwtToken);
      }
      alert("Login successful");
      window.location.href = "/recipe";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 w-[400px] ">
      <div className="mt-2 mb-6 text-4xl font-semibold text-center">Login</div>
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
          <label className="text-lg font-semibold">Password</label>
          <input
            name="password"
            className="w-[380px] mt-2 p-1 rounded-lg border border-black"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-10 text-xl font-semibold">
          <button className="p-3 px-10 text-black transition-all duration-300 ease-in-out bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
