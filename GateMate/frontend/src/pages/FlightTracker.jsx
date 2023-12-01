import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet"; // Import the Icon component
import "../../node_modules/leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import useFetch from "../hooks/useFetch";
import "leaflet-rotatedmarker";

function FlightTracker() {
  const [map, setMap] = useState(null);
  const { error, isPending, data: flights } = useFetch("http://localhost:8080/api/livedata");
  const position = [38.7800, -9.1350];

  const planeIcon = new Icon({
    iconUrl: "../plane.webp",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const calculateRotation = (direction) => {
    direction = (direction + 180) % 360 - 180;
  
    return direction;
  }

  useEffect(() => {
    // console.log(flights);
  }, [flights]);

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
        <div className="flex-1 ml-4 mr-10" style={{ height: '768px', width: '50%'}}>
          <MapContainer center={[38.7800, -9.1350]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {flights && flights.map((flight) => (
              //console.log(flight),
              <Marker
              key={flight.flight_number}
              position={[flight.latitude, flight.longitude]}
              icon={planeIcon}
              rotationAngle={calculateRotation(flight.direction + 45)}
            >
              <Popup>
                <Link to={`/flightInfo/${flight.flight_number}`} state={{ flightData: flight }}>
                  <div className="flex flex-col">
                    <div className="text-xl font-bold">{flight.flight_number}</div>
                    <div className="text-sm">{flight.airline}</div>
                    <div className="text-sm">{flight.plane_type}</div>
                    <div className="text-sm">{flight.city}</div>
                    <div className="text-sm">Altitude: {flight.altitude}</div>
                    <div className="text-sm">Arrival Airport: {flight.arrival_airport}</div>
                    <div className="text-sm">Departure Airport: {flight.departure_airport}</div>
                    <div className="text-sm">Direction: {flight.direction}</div>
                    <div className="text-sm">Speed: {flight.speed}</div>
                    <div className="text-sm">Vertical Speed: {flight.vertical_speed}</div>
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
