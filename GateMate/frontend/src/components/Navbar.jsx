import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else if (response.status === 204) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar bg-blue-600 text-white h-20 flex items-center relative">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-60 h-50" />
        </Link>
      </div>
      <div className="flex-none">
        <div className="menu menu-horizontal flex items-center">
          <div className="px-4 text-2xl">
            <Link to="/allflights">All Flights</Link>
          </div>
          <div className="px-4 text-2xl">
            <Link to="/flighttracker">Flight Tracker</Link>
          </div>
          <div className="ml-2 text-2xl relative">
            {token && (
              <>
                <button
                  onClick={toggleDropdown}
                  className="text-blue-600 py-2 rounded-lg font-bold text-lg hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  <img
                    src={user}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {dropdownVisible && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-50">
                    <Link to="/UserSubscribedFlights">
                      <button className="block px-4 py-2 text-blue-600 hover:bg-gray-200 w-full text-left transition duration-300 ease-in-out">
                        Subscribed Flights
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout(token);
                      }}
                      className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left transition duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
            {!token && (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-lg hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
