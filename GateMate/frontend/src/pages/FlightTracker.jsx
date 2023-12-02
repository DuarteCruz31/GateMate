import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import useFetch from "../hooks/useFetch";
import airplaneIcon from "../assets/plane.webp";
import "leaflet-rotatedmarker";

function FlightTracker() {
  const [map, setMap] = useState(null);
  const {
    error,
    isPending,
    data: flights,
  } = useFetch("http://localhost:8080/api/allflights");

  const position = [38.78, -9.135];

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
      <div className="flex flex-row">
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
                  key={flight.flightNumber}
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
                      to={`/flightInfo/${flight.flightNumber}`}
                      state={{ flightData: flight }}
                    >
                      <div className="flex flex-col">
                        <div className="text-xl font-bold">
                          {flight.flightNumber}
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
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default FlightTracker;
