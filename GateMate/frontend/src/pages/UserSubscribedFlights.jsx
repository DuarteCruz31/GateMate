import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightCard from "../components/FlightCard";

function UserSubscribedFlights() {
  const token = localStorage.getItem("token");
  const [subscribedPlanes, setSubscribedPlanes] = useState([]);

  const fetchSubscribedPlanes = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/subscribed_flights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      if (response.status === 200) {
        const planesData = await response.json();
        setSubscribedPlanes(planesData);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.setItem("invalidToken", true);
        window.location.href = "/login";
      } else if (response.status === 204) {
        setSubscribedPlanes([]);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchSubscribedPlanes(token);
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Voos Subscritos</h2>
          <div>
            {subscribedPlanes.length > 0 &&
              subscribedPlanes.map((flight) => (
                <Link
                  to={`/flightInfo/${flight.flightIata}`}
                  key={flight.flightIata}
                  state={{ flightIata: flight.flightIata }}
                >
                  <FlightCard flight={flight} />
                </Link>
              ))}
            {subscribedPlanes.length === 0 && (
              <p className="text-xl">Não tem voos subscritos</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UserSubscribedFlights;
