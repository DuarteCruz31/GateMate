import React, { useState, useEffect } from "react";
import plane from "../assets/plane.png";
import arrow from "../assets/arrow.png";

function FlightCard({ flight }) {
  const [lastUpdated, setLastUpdated] = useState(new Date().getTime());
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setLastUpdated(new Date().getTime());
    }, 60000); // Atualiza a cada 1 minuto (60 segundos)

    // Limpar o intervalo quando o componente é desmontado
    return () => clearInterval(updateInterval);
  }, []); // O segundo argumento vazio significa que este efeito é executado apenas uma vez, semelhante ao componentDidMount

  // Converter o valor numérico para um objeto Date
  const lastUpdatedTime = flight.updated;

  const timeSinceLastUpdate = Math.round(
    (lastUpdated - lastUpdatedTime) / 1000 / 60
  ); // Calcula o tempo decorrido em segundos

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between relative">
      <div className="flex flex-col">
        <div className="mr-6">
          <h3 className="text-3xl font-semibold">
            {flight.departure.iata} - {flight.arrival.iata}
          </h3>
        </div>
        <div className="mb-5">
          <p className="text-base">{flight.flightIata}</p>
        </div>
        <div className="flex flex-row items-center">
          <img src={plane} alt="Plane" />
          <p className="text-base">{flight.airlineName}</p>
        </div>
      </div>
      <div>
        <img src={arrow} alt="arrow" />
      </div>
      {timeSinceLastUpdate == 0 && (
        <div className="absolute top-0 right-0 bg-green-200 p-2 rounded-bl">
          {`Atualizado agora mesmo`}
        </div>
      )}
      {timeSinceLastUpdate != 0 && (
        <div className="absolute top-0 right-0 bg-yellow-200 p-2 rounded-bl">
          {`Atualizado há ${timeSinceLastUpdate} minutos`}
        </div>
      )}
    </div>
  );
}

export default FlightCard;
