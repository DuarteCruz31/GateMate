import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightInfo from "../components/FlightInfo";

function Flight(props) {
  const location = useLocation();
  const flightData = location.state?.flightData;

  if (!flightData) {
    // Lida com a falta de dados, como redirecionar para outra página ou exibir uma mensagem de erro
    return <p>Dados de voo não encontrados</p>;
  }

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
          {flightData && (
            <div>
              <div className="bg-sky-950 text-white flex flex-col items-center justify-center mx-5">
                <div className="mt-7">
                  <p className="text-4xl">
                    {flightData.origin} - {flightData.destination}
                  </p>
                </div>
                <div className="mt-2 mb-16">
                  <p className="text-xs">
                    {flightData.flightCode} - {flightData.airline}
                  </p>
                </div>
              </div>
              <div>
                <FlightInfo flight={flightData} />
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
