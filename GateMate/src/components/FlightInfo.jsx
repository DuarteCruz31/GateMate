import React from "react";
import plane from "../assets/plane.png";

function FlightInfo({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between">
      <div>
        <p className="font-bold text-4xl">{flight.airline_name}</p>
        <p className="font text-3xl">{flight.departure.airport.gate}</p>
      </div>
      <div className="card-body flex flex-row justify-between">
        <div className="w-1/4 flex flex-col items-center">
          <p className="font-bold text-4xl">6:55 PM</p>
          <p className="font text-4xl">{flight.departure.iata}</p>
          <p className="font text-md">Left 1h 04 m ago</p>
        </div>
        <div className="w-2/4 flex flex-col items-center">
          <div className="font text-4xl">2h 34 m</div>
          <div className="w-4/5 flex flex-row items-center">
            <p className="bg-black h-1 w-[20%]" />
            <img src={plane} alt="Plane" />
            <p className="bg-black h-1 w-[80%]" />
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-center">
          <p className="font-bold text-4xl">10:30 PM</p>
          <p className="font text-4xl">{flight.arrival.iata}</p>
          <p className="font text-md">Estimated arriving in ...</p>
        </div>
      </div>
    </div>
  );
}

export default FlightInfo;
