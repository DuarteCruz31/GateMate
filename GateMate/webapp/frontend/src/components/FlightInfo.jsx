import React from "react";
import plane from "../assets/plane.png";
import arrow from "../assets/arrow.png";

function FlightInfo({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between">
      {/* <figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure> */}
      <div>
        <p className="font-bold text-4xl">{flight.airline}</p>
        <p className="font text-3xl">flight.gate</p>
      </div>
      <div className="card-body flex flex-row justify-between">
        <div className="w-1/4 flex flex-col items-center">
          <p className="font-bold text-4xl">6:55 PM</p>
          <p className="font text-4xl">{flight.origin}</p>
          <p className="font text-md">Left 1h 04 m ago</p>
        </div>
        <div className="w-2/4 flex flex-col items-center">
          <div className="font text-4xl">2h 34 m</div>
          <div className="w-4/5 flex flex-row items-center">
            <p className="bg-black h-1 w-[20%]" />
            <img src={plane} alt="Plane" />
            <p className="bg-black h-1 w-[80%]" />
          </div>
          <p className="font text-cyan-700 text-2xl">Direct</p>
          <p className="font text-blue-950 text-xl">{flight.flightCode}</p>
        </div>
        <div className="w-1/4 flex flex-col items-center">
          <p className="font-bold text-4xl">10:30 PM</p>
          <p className="font text-4xl">{flight.destination}</p>
          <p className="font text-md">Arriving in 1h 30 m</p>
        </div>
      </div>
    </div>
  );
}

export default FlightInfo;
