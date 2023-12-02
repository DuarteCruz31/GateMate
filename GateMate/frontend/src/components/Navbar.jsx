import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="navbar bg-blue-600 text-white h-20">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-60 h-50" />
        </Link>
      </div>
      <div className="flex-none">
        <div className="menu menu-horizontal">
          <div className="px-4 text-2xl">
            <Link to="/allflights">All Flights</Link>
          </div>
          <div className="px-4 text-2xl">
            <Link to="/flighttracker">Flight Tracker</Link>
          </div>
          <div className="ml-4 text-2xl">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-lg hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
