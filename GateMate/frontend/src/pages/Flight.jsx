import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightInfo from "../components/FlightInfo";
import FlightInfoTable from "../components/FlightInfoTable";
import FlightLiveDataTable from "../components/FlightLiveDataTable";
import "../css/flight.css";

function Flight(props) {
  const location = useLocation();
  const flightIata = location.state?.flightIata;
  const token = localStorage.getItem("token");
  const [flightInfo, setFlightInfo] = useState();
  const [flightInfoNotFound, setflightInfoNotFound] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const fetchFlightInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/flight/" + flightIata,
        {
          method: "GET",
        }
      );

      const responseContent = await response.json();
      if (response.status === 200) {
        console.log("FLight info found");
        setFlightInfo(responseContent);
        setflightInfoNotFound(false);
      } else if (response.status === 404) {
        console.error("Flight info not found");
        setFlightInfo(null);
        setflightInfoNotFound(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setFlightInfo(null);
      setflightInfoNotFound(true);
    }
  };

  const flightSubscribed = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/is_subscribed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            flightIata: flightIata,
          }),
        }
      );

      const responseContent = await response.text();
      if (response.status === 200) {
        console.log(responseContent);
        setIsSubscribed(true);
      } else if (response.status === 401) {
        console.error(responseContent);
        localStorage.removeItem("token");
        setIsSubscribed(false);
      } else if (response.status === 204) {
        console.error(responseContent);
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchFlightInfo();
    flightSubscribed(token);
  }, []);

  // Função a ser executada quando o botão for clicado
  const handleSubscribe = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/subscribe_flight",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            flightIata: flightIata,
          }),
        }
      );

      const responseContent = await response.text();
      if (response.status === 200) {
        console.log(responseContent);
        setConfirmationText(responseContent);
        setIsSubscribed(true);
      } else if (response.status === 401) {
        console.error(responseContent);
        localStorage.removeItem("token");
        localStorage.setItem("invalidToken", true);
        setIsSubscribed(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Erro:", error);
    }

    setShowConfirmation(true);
  };

  const handleUnsubscribe = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/unsubscribe_flight",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            flightIata: flightIata,
          }),
        }
      );

      const responseContent = await response.text();
      if (response.status === 200) {
        console.log(responseContent);
        setConfirmationText(responseContent);
        setIsSubscribed(false);
      } else if (response.status === 401) {
        console.error(responseContent);
        localStorage.removeItem("token");
        setIsSubscribed(false);
        localStorage.setItem("invalidToken", true);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Erro:", error);
    }

    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>
        <div className="flex-1">
          <div className="h-10 bg-white"></div>

          {flightInfoNotFound && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-1/2 h-10 text-center flex items-center justify-center mt-10"
              role="alert"
            >
              <strong className="font-bold">Flight info not found!</strong>
            </div>
          )}
          {!flightInfoNotFound && flightInfo && (
            <div>
              <div className="bg-sky-950 text-white flex flex-col items-center justify-center mx-5">
                <div className="mt-7">
                  <p className="text-4xl">
                    {flightInfo.departure.iata} - {flightInfo.arrival.iata}
                  </p>
                </div>
                <div className="mt-2 mb-16">
                  <p className="text-xs">
                    {flightInfo.flightIata} - {flightInfo.airlineName}
                  </p>
                </div>
              </div>
              <div>
                <FlightInfo flight={flightInfo} />
              </div>
              <div className="flex flex-row gap-10 mb-10">
                <div className="overflow-x-auto w-1/3 ml-10">
                  <p className="text-center text-4xl font-bold mb-5">
                    Departure
                  </p>
                  <FlightInfoTable flight={flightInfo.departure} />
                </div>
                <div className="overflow-x-auto w-1/3">
                  <p className="text-center text-4xl font-bold mb-5">
                    Live Data
                  </p>
                  <FlightLiveDataTable flight={flightInfo.liveData} />
                </div>
                <div className="overflow-x-auto w-1/3 mr-10">
                  <p className="text-center text-4xl font-bold mb-5">Arrival</p>
                  <FlightInfoTable flight={flightInfo.arrival} />
                </div>
              </div>
              {!isSubscribed && (
                <div className="flex justify-center mb-10">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSubscribe(token)}
                  >
                    Subscribe Flight
                  </button>
                </div>
              )}
              {isSubscribed && (
                <div className="flex justify-center mb-10">
                  <button
                    className="btn btn-error"
                    onClick={() => handleUnsubscribe(token)}
                  >
                    Unsubscribe Flight
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
      {showConfirmation && (
        <div className="popup">
          <div className="popup-content">
            <p>{confirmationText}</p>
            <button onClick={handleConfirmationClose}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Flight;
