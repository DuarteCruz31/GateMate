import React from "react";
import plane from "../assets/plane.png";
import arrow from "../assets/arrow.png";

function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="mr-6">
          <h3 className="text-3xl font-semibold">
            {flight.origin} - {flight.destination}
          </h3>
        </div>
        <div className="mb-5">
          <p className="text-base">{flight.flightCode}</p>
        </div>
        <div className="flex flex-row items-center">
          <img src={plane} alt="Plane" />
          <p className="text-base">{flight.airline}</p>
        </div>
      </div>
      <div>
        <img src={arrow} alt="arrow" />
      </div>
    </div>
  );
}

export default FlightCard;
