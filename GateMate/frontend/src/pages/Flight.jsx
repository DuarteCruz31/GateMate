import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightInfo from "../components/FlightInfo";
import FlightInfoArrival from "../components/FlightInfoArrival";
import FlightInfoDeparture from "../components/FlightInfoDeparture";
import FlightLiveDataTable from "../components/FlightLiveDataTable";
import useFetch from "../hooks/useFetch";

function Flight(props) {
  const location = useLocation();
  const flightIata = location.state?.flightIata;

  if (!flightIata) {
    // Lida com a falta de dados, como redirecionar para outra página ou exibir uma mensagem de erro
    return <p>Dados de voo não encontrados</p>;
  }

  const {
    error,
    isPending,
    data: flight,
  } = useFetch("http://localhost:8080/api/" + flightIata);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>

        <div className="flex-1">
          <div className="h-10 bg-white"></div>
          {flightIata && (
            <div>
              <div className="bg-sky-950 text-white flex flex-col items-center justify-center mx-5">
                <div className="mt-7">
                  <p className="text-4xl">
                    {flight.departure.iata} - {flight.arrival.iata}
                  </p>
                </div>
                <div className="mt-2 mb-16">
                  <p className="text-xs">
                    {flight.flightNumber} - {flight.airlineIata}
                  </p>
                </div>
              </div>
              <div>
                <FlightInfo flight={flight} />
              </div>
              <div className="flex flex-row gap-10 mb-10">
                <div className="overflow-x-auto w-1/3 ml-10">
                  <p className="text-center text-4xl font-bold mb-5">
                    Departure
                  </p>
                  <FlightInfoDeparture flight={flight} />
                </div>
                <div className="overflow-x-auto w-1/3">
                  <p className="text-center text-4xl font-bold mb-5">
                    Live Data
                  </p>
                  <FlightLiveDataTable flight={flight} />
                </div>
                <div className="overflow-x-auto w-1/3 mr-10">
                  <p className="text-center text-4xl font-bold mb-5">Arrival</p>
                  <FlightInfoArrival flight={flight} />
                </div>
              </div>
              <div className="flex justify-center mb-10">
                <button className="btn btn-primary"> Subscribe Flight </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Flight;
