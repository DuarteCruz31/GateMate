import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import FlightCard from "../components/FlightCard";
import mapa from "../assets/flighttracker/mapa.png";

function FlightTracker() {
  const flights = [
    {
      id: 1,
      origin: "LIS",
      destination: "JFK",
      flightCode: "TP574",
      airline: "TAP Air Portugal",
    },
    {
      id: 2,
      origin: "FRA",
      destination: "JFK",
      flightCode: "FR124",
      airline: "Air France",
    },
    {
      id: 3,
      origin: "JFK",
      destination: "MDR",
      flightCode: "AMR535",
      airline: "American Airlines",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1 flex flex-row">
        <div className="w-1/3 p-5 mt-7 flex flex-col">
          <div>
            <button className="text-blue-400">
              <u>Reset all</u>
            </button>
          </div>
          <div className="pb-5 pt-2">
            <Filter type={"Company"} />
          </div>
          <div className="py-5">
            <Filter type={"PlaneType"} />
          </div>
          <div className="py-5">
            <Filter type={"City"} />
          </div>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="p-12">
            <img src={mapa} alt="" />
          </div>
          {flights &&
            flights.map((flight) => (
              <Link
                to={`/flightInfo/${flight.id}`}
                key={flight.id}
                state={{ flightData: flight }}
              >
                <FlightCard flight={flight}></FlightCard>
              </Link>
            ))}
          <div></div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default FlightTracker;
