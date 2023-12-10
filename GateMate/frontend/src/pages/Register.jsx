import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image1 from "../assets/register/1.jpeg";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registo bem-sucedido");
        // Aqui você pode redirecionar ou realizar outras ações após o registro bem-sucedido
      } else {
        console.error("Erro no login");
        // Trate os erros de registro aqui
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        <div className="relative">
          <img className="w-full h-96 object-cover" src={image1} />
          <div className="absolute inset-y-0 left-20 flex flex-col items-start justify-center">
            <div className="text-blue-800 text-8xl font-bold mb-4">
              Register
            </div>
          </div>
        </div>
        <form
          className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full bg-teal-500 rounded-sm border border-teal-500 justify-start items-start inline-flex">
            <button
              type="submit"
              className=" px-10 py-5  text-center text-white text-base font-normal w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Register;
