import React from "react";

function FlightInfoArrival({ flight }) {
  console.log(flight);
  return (
    <>
      <table className="table">
        <tbody>
          <tr className="bg-base-200">
            <th>Airport Iata</th>
            {flight.iata == null && <td>Unavailable information</td>}
            {flight.iata != null && <td>{flight.iata}</td>}
          </tr>
          <tr>
            <th>Airport Icao</th>
            {flight.icao == null && <td>Unavailable information</td>}
            {flight.icao != null && <td>{flight.icao}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Terminal</th>
            {flight.terminal == null && <td>Unavailable information</td>}
            {flight.terminal != null && <td>{flight.terminal}</td>}
          </tr>
          <tr>
            <th>Gate</th>
            {flight.gate == null && <td>Unavailable information</td>}
            {flight.gate != null && <td>{flight.gate}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Delay</th>
            {flight.delay == null && <td>Unavailable information</td>}
            {flight.delay != null && <td>{flight.delay}</td>}
          </tr>
          <tr>
            <th>Scheduled</th>
            {flight.scheduled == null && <td>Unavailable information</td>}
            {flight.scheduled != null && <td>{flight.scheduled}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Estimated</th>
            {flight.estimated == null && <td>Unavailable information</td>}
            {flight.estimated != null && <td>{flight.estimated}</td>}
          </tr>
          <tr>
            <th>Actual</th>
            {flight.actual == null && <td>Unavailable information</td>}
            {flight.actual != null && <td>{flight.actual}</td>}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default FlightInfoArrival;
