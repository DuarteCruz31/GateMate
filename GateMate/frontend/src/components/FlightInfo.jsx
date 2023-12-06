import React from "react";
import plane from "../assets/plane.png";

function FlightInfo({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between">
      <div className="w-1/5 text-center">
        <p className="font-bold text-4xl">{flight.airlineName}</p>
      </div>
      <div className="card-body flex flex-row text-center w-4/5">
        <div className="w-1/4 flex items-center">
          <p className="font text-4xl">{flight.departure.iata}</p>
        </div>
        <div className="w-2/4 flex flex-row items-center">
          <p className="bg-black h-1 w-[20%]" />
          <img src={plane} alt="Plane" />
          <p className="bg-black h-1 w-[60%]" />
        </div>
        <div className="w-1/4 flex items-center">
          <p className="font text-4xl">{flight.arrival.iata}</p>
        </div>
      </div>
    </div>
  );
}

export default FlightInfo;
