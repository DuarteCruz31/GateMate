import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightCard from "../components/FlightCard";
import image1 from "../assets/allflights/1.jpeg";

function AllFlights() {
  const [flights, setFlights] = useState([]);
  const [flightsNotFound, setFlightsNotFound] = useState(true);
  const [flightsUrl, setFlightsUrl] = useState(
    "http://localhost:8080/api/allflights"
  );

  const fetchAllFlights = useCallback(async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      const responseContent = await response.json();
      if (response.status === 200) {
        console.log("Flights found");
        setFlights(responseContent);
        setFlightsNotFound(false);
      } else if (response.status === 404) {
        console.error("Flights not found");
        setFlights(null);
        setFlightsNotFound(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setFlights(null);
      setFlightsNotFound(true);
    }
  }, []);

  useEffect(() => {
    fetchAllFlights(flightsUrl);

    const id = setInterval(() => fetchAllFlights(flightsUrl), 3000);

    return () => clearInterval(id);
  }, [fetchAllFlights, flightsUrl]);

  const [filter, setFilter] = useState({
    flightIata: "",
    from: "",
    to: "",
    company: "",
  });

  function resetFilters() {
    setFilter({
      flightIata: "",
      from: "",
      to: "",
      company: "",
    });
    setFlightsUrl("http://localhost:8080/api/allflights");
    fetchAllFlights(flightsUrl);
  }

  async function handleSearch() {
    var url = "http://localhost:8080/api/allflights?";
    if (filter.from != "") {
      url += `from=${filter.from}&`;
    }
    if (filter.to != "") {
      url += `to=${filter.to}&`;
    }
    if (filter.company != "") {
      url += `company=${filter.company}&`;
    }
    if (filter.flightIata != "") {
      url += `flightIata=${filter.flightIata}&`;
    }

    setFlightsUrl(url);
    fetchAllFlights(url);
  }

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
                name="flightIata"
                id="flightIata"
                placeholder=" Flight Iata"
                value={filter.flightIata}
                onChange={(e) =>
                  setFilter({ ...filter, flightIata: e.target.value })
                }
              />
            </div>
            <div className="w-1/5 mx-1">
              <select
                className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-flex"
                value={filter.from}
                onChange={(e) => setFilter({ ...filter, from: e.target.value })}
              >
                <option value="" selected>
                  From
                </option>
                {flights &&
                  [
                    ...new Set(flights.map((flight) => flight.departure.iata)),
                  ].map((uniqueIata) => (
                    <option key={uniqueIata} value={uniqueIata}>
                      {uniqueIata}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-1/5 mx-1">
              <select
                className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-fle"
                value={filter.to}
                onChange={(e) => setFilter({ ...filter, to: e.target.value })}
              >
                <option value="" selected>
                  To
                </option>
                {flights &&
                  [
                    ...new Set(flights.map((flight) => flight.arrival.iata)),
                  ].map((uniqueIata) => (
                    <option key={uniqueIata} value={uniqueIata}>
                      {uniqueIata}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-1/5 mx-1">
              <select
                className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-fle"
                value={filter.company}
                onChange={(e) =>
                  setFilter({ ...filter, company: e.target.value })
                }
              >
                <option value="" selected>
                  Company
                </option>
                {flights &&
                  [...new Set(flights.map((flight) => flight.airlineName))].map(
                    (uniqueName) => (
                      <option key={uniqueName} value={uniqueName}>
                        {uniqueName}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="w-1/5 ml-1">
              <button
                className="w-full bg-blue-700 rounded justify-center items-center inline-flex px-12 py-2 text-center text-white text-base font-bold leading-normal"
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </div>
            <div className="w-1/5 ml-1">
              <button
                className="w-full bg-gray-400 rounded justify-center items-center inline-flex px-6 py-2 text-center text-white text-base font-bold leading-normal"
                onClick={() => resetFilters()}
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div>
            {flightsNotFound && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-1/2 h-10 text-center flex items-center justify-center mt-10"
                role="alert"
              >
                <strong className="font-bold">Flights not found!</strong>
              </div>
            )}
            {!flightsNotFound &&
              flights.map((flight) => (
                <Link
                  to={`/flightInfo/${flight.flightIata}`}
                  key={flight.flightIata}
                  state={{ flightIata: flight.flightIata }}
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
