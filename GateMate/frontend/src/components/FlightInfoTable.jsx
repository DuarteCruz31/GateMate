import React from "react";

function FlightInfoArrival({ flight }) {
  return (
    <>
      <table className="table">
        <tbody>
          <tr className="bg-base-200">
            <th>Airport Name</th>
            {flight.name == null && <td>Unavailable information</td>}
            {flight.name != null && <td>{flight.name}</td>}
          </tr>
          <tr>
            <th>Terminal</th>
            {flight.terminal == null && <td>Unavailable information</td>}
            {flight.terminal != null && <td>{flight.terminal}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Gate</th>
            {flight.gate == null && <td>Unavailable information</td>}
            {flight.gate != null && <td>{flight.gate}</td>}
          </tr>
          <tr>
            <th>Delay</th>
            {flight.delay == null && <td>Unavailable information</td>}
            {flight.delay != null && <td>{flight.delay}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Scheduled</th>
            {flight.scheduled == null && <td>Unavailable information</td>}
            {flight.scheduled != null && <td>{flight.scheduled}</td>}
          </tr>
          <tr>
            <th>Estimated</th>
            {flight.estimated == null && <td>Unavailable information</td>}
            {flight.estimated != null && <td>{flight.estimated}</td>}
          </tr>
          <tr className="bg-base-200">
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
