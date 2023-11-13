import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";

function Flight() {
  const { id } = useParams();
  /* const { data: flight, error, isPending } = useFetch(); */
  const [flight, setFlight] = useState(null);

  const flightsData = [
    {
      id: 1,
      origin: "LIS",
      destination: "FRA",
      flightCode: "TP474",
      airline: "TAP Air Portugal",
    },
    {
      id: 2,
      origin: "MAD",
      destination: "US",
      flightCode: "UX1157",
      airline: "Air EUROPA",
    },
  ];

  useEffect(() => {
    const selectedFlight = flightsData.find((f) => f.id === parseInt(id));
    setFlight(selectedFlight);
  }, [id]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>

        <div className="flex-1">
          <div className="h-10 bg-white"></div>
          {/* {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>} */}
          <div className="bg-sky-950 text-white flex flex-col items-center justify-center mx-5">
            <div className="mt-7">
              <p className="text-4xl">
                {flight.origin} - {flight.destination}
              </p>
            </div>
            <div className="mt-2 mb-16">
              <p className="text-xs">
                {flight.flightCode} - {flight.airline}
              </p>
            </div>
          </div>
          <div>
            {/* {flight && <InfoFlightCard flight={flight}></InfoFlightCard>} */}
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Flight;
