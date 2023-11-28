import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightCard from "../components/FlightCard";
import useFetch from "../hooks/useFetch";
import image1 from "../assets/allflights/1.jpeg";
import { data } from "autoprefixer";

function AllFlights() {
  const {
    error,
    isPending,
    data: flights,
  } = useFetch("http://localhost:8080/api/allflights");

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        <div>
          <img className="h-full w-full object-cover" src={image1} />
        </div>
        <div className="p-20">
          <div className="justify-start items-center inline-flex">
            <div className="text-sky-950 text-5xl font-bold leading-10">
              Find and subscribe flights here
            </div>
          </div>
          <div className="relative mt-5 flex items-center">
            <div className="w-1/5 mr-1">
              <input
                className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-flex"
                type="text"
                name="flightCode"
                id="flightCode"
                placeholder=" Code"
              />
            </div>
            <div className="w-1/5 mx-1">
              <select className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-flex">
                <option value="" selected>
                  From
                </option>
                <option value="LIS">LIS</option>
              </select>
            </div>

            <div className="w-1/5 mx-1">
              <select className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-fle">
                <option value="" selected>
                  To
                </option>
                <option value="FRA">FRA</option>
              </select>
            </div>
            <div className="w-1/5 mx-1">
              <select className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-fle">
                <option value="" selected>
                  Company
                </option>
                <option value="TAP Air Portugal">TAP Air Portugal</option>
              </select>
            </div>

            <div className="w-1/5 ml-1">
              <button className="w-full bg-blue-700 rounded justify-center items-center inline-flex px-12 py-2 text-center text-white text-base font-bold leading-normal">
                Search
              </button>
            </div>
          </div>
          <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {flights &&
              flights.map((flight) => (
                <Link
                  to={`/flightInfo/${flight.flight_number}`}
                  key={flight.flight_number}
                  state={{ flightData: flight }}
                >
                  <FlightCard flight={flight} />
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AllFlights;
