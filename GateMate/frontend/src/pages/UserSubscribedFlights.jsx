import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightCard from "../components/FlightCard";

function UserSubscribedFlights() {
  const token = localStorage.getItem("token");
  const [subscribedPlanes, setSubscribedPlanes] = useState([]);

  useEffect(() => {
    validateUserToken(token);
    fetchSubscribedPlanes(token);
  }, [token]);

  const validateUserToken = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (response.ok) {
        console.log("Token válido");
      } else {
        console.error("Token inválido");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

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

      if (response.ok) {
        const planesData = await response.json();
        setSubscribedPlanes(planesData);
      } else {
        console.error("Aviões não encontrados");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1 p-8">
        {subscribedPlanes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Voos Subscritos</h2>
            <div>
              {subscribedPlanes.map((flight) => (
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
        )}
        {subscribedPlanes.length === 0 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Voos Subscritos</h2>
            <p className="text-xl">Não tem voos subscritos</p>
          </div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UserSubscribedFlights;
