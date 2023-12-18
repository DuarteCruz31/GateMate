import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import airplaneIcon from "../assets/plane.webp";
import "leaflet-rotatedmarker";

function FlightTracker() {
  const [flights, setFlights] = useState([]);
  const [flightsNotFound, setFlightsNotFound] = useState(false);
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

  const planeIcon = new Icon({
    iconUrl: airplaneIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const calculateRotation = (direction) => {
    direction = ((direction + 180) % 360) - 180;

    return direction;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-10">
        <Navbar />
      </div>
      <div className="flex flex-row z-0">
        <div className="w-1/3 p-5 mt-7 flex flex-col">
          <div>
            <button className="text-blue-400" onClick={() => resetFilters()}>
              <u>Reset all</u>
            </button>
          </div>
          <div className="pb-5 pt-2">
            <div className="font-bold">Flight Iata</div>
            <hr />
            <div className="mt-3">
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
          </div>
          <div className="py-5">
            <div>
              <div className="font-bold">Company</div>
              <hr />
              <div className="mt-3">
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
                    [
                      ...new Set(flights.map((flight) => flight.airlineName)),
                    ].map((uniqueName) => (
                      <option key={uniqueName} value={uniqueName}>
                        {uniqueName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div>
              <div className="font-bold">From</div>
              <hr />
              <div className="mt-3">
                <select
                  className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-flex"
                  value={filter.from}
                  onChange={(e) =>
                    setFilter({ ...filter, from: e.target.value })
                  }
                >
                  <option value="" selected>
                    From
                  </option>
                  {flights &&
                    [
                      ...new Set(
                        flights.map((flight) => flight.departure.iata)
                      ),
                    ].map((uniqueIata) => (
                      <option key={uniqueIata} value={uniqueIata}>
                        {uniqueIata}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div>
              <div className="font-bold">To</div>
              <hr />
              <div className="mt-3">
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
            </div>
          </div>

          <div className="py-5">
            <button
              className="w-full bg-blue-700 rounded justify-center items-center inline-flex px-12 py-2 text-center text-white text-base font-bold leading-normal"
              onClick={() => handleSearch()}
            >
              Apply filters
            </button>
          </div>
        </div>
        {flightsNotFound && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-1/2 h-10 text-center flex items-center justify-center mt-10"
            role="alert"
          >
            <strong className="font-bold">Flights not found!</strong>
          </div>
        )}
        {!flightsNotFound && (
          <div
            className="flex-1 ml-4 mr-10"
            style={{ height: "768px", width: "50%" }}
          >
            <MapContainer
              center={[38.78, -9.135]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {flights &&
                flights.map((flight) => (
                  <Marker
                    key={flight.flightIata}
                    position={[
                      flight.liveData.latitude,
                      flight.liveData.longitude,
                    ]}
                    icon={planeIcon}
                    rotationAngle={calculateRotation(
                      flight.liveData.direction + 45
                    )}
                  >
                    <Popup>
                      <Link
                        to={`/flightInfo/${flight.flightIata}`}
                        key={flight.flightIata}
                        state={{ flightIata: flight.flightIata }}
                      >
                        <div className="flex flex-col">
                          <div className="text-xl font-bold">
                            {flight.flightIata}
                          </div>
                          <div className="text-sm">{flight.airlineName}</div>
                          <div className="text-sm">
                            Altitude: {flight.liveData.altitude}
                          </div>
                          <div className="text-sm">
                            Arrival Airport Iata: {flight.arrival.iata}
                          </div>
                          <div className="text-sm">
                            Departure Airport Iata: {flight.departure.iata}
                          </div>
                          <div className="text-sm">
                            Direction: {flight.liveData.direction}
                          </div>
                          <div className="text-sm">
                            Speed: {flight.liveData.speed}
                          </div>
                          <div className="text-sm">
                            Vertical Speed: {flight.liveData.vertical_speed}
                          </div>
                        </div>
                      </Link>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default FlightTracker;
