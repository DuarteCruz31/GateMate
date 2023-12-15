import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightInfo from "../components/FlightInfo";
import FlightInfoTable from "../components/FlightInfoTable";
import FlightLiveDataTable from "../components/FlightLiveDataTable";
import useFetch from "../hooks/useFetch";
import "../css/flight.css";

function Flight(props) {
  const location = useLocation();
  const flightIata = location.state?.flightIata;

  const {
    error,
    isPending,
    data: flightInfo,
  } = useFetch("http://localhost:8080/api/flight/" + flightIata);

  const [isSubscribed, setIsSubscribed] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const flightSubscribed = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/is_subscribed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            flightIata: flightIata,
          }),
        }
      );

      console.log(response);
      if (response.ok && response.status === 200) {
        console.log("Subscrito");
        setIsSubscribed(true);
        setConfirmationText("Subscrito com sucesso");
      } else {
        console.error("Não subscrito");
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    flightSubscribed();
  }, []);

  // Função a ser executada quando o botão for clicado
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if ((await validateUserToken(localStorage.getItem("token"))) === true) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/subscribe_flight",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              flightIata: flightIata,
            }),
          }
        );

        if (response.ok) {
          console.log("Subscrito com sucesso");
          setIsSubscribed(true);
          setConfirmationText("Subscrito com sucesso");
        } else {
          console.error("Erro na subscrição");
        }
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    }
    setShowConfirmation(true);
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if ((await validateUserToken(localStorage.getItem("token"))) === true) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/unsubscribe_flight",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              flightIata: flightIata,
            }),
          }
        );

        if (response.ok) {
          console.log("Desubscrito com sucesso");
          setIsSubscribed(false);
          setConfirmationText("Desubscrito com sucesso");
        } else {
          console.error("Erro na desubscrição");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    setShowConfirmation(true);
  };

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
        return true;
      } else {
        console.error("Token inválido");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return false;
      }
    } catch (error) {
      console.error("Erro:", error);
      return false;
    }
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
          {flightInfo && (
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
                  <button className="btn btn-primary" onClick={handleSubscribe}>
                    Subscribe Flight
                  </button>
                </div>
              )}
              {isSubscribed && (
                <div className="flex justify-center mb-10">
                  <button className="btn btn-error" onClick={handleUnsubscribe}>
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
