import React from "react";

function FlightInfoDeparture({ flight }) {
  return (
    <>
      <table className="table">
        <tbody>
          <tr className="bg-base-200">
            <th>Airport</th>
            {flight.departure.airport == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.airport != null && (
              <td>{flight.departure.airport}</td>
            )}
          </tr>
          <tr>
            <th>Timezone</th>
            {flight.departure.timezone == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.timezone != null && (
              <td>{flight.departure.timezone}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Iata</th>
            {flight.departure.iata == null && <td>Unavailable information</td>}
            {flight.departure.iata != null && <td>{flight.departure.iata}</td>}
          </tr>
          <tr>
            <th>Icao</th>
            {flight.departure.icao == null && <td>Unavailable information</td>}
            {flight.departure.icao != null && <td>{flight.departure.icao}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Terminal</th>
            {flight.departure.terminal == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.terminal != null && (
              <td>{flight.departure.terminal}</td>
            )}
          </tr>
          <tr>
            <th>Gate</th>
            {flight.departure.gate == null && <td>Unavailable information</td>}
            {flight.departure.gate != null && <td>{flight.departure.gate}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Delay</th>
            {flight.departure.delay == null && <td>Unavailable information</td>}
            {flight.departure.delay != null && (
              <td>{flight.departure.delay}</td>
            )}
          </tr>
          <tr>
            <th>Scheduled</th>
            {flight.departure.scheduled == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.scheduled != null && (
              <td>{flight.departure.scheduled}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Estimated</th>
            {flight.departure.estimated == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.estimated != null && (
              <td>{flight.departure.estimated}</td>
            )}
          </tr>
          <tr>
            <th>Actual</th>
            {flight.departure.actual == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.actual != null && (
              <td>{flight.departure.actual}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Estimated Runway</th>
            {flight.departure.estimatedRunway == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.estimatedRunway != null && (
              <td>{flight.departure.estimatedRunway}</td>
            )}
          </tr>
          <tr>
            <th>Actual Runway</th>
            {flight.departure.actualRunway == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.actualRunway != null && (
              <td>{flight.departure.actualRunway}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Aircraft Registration</th>
            {flight.departure.aircraftRegistration == null && (
              <td>Unavailable information</td>
            )}
            {flight.departure.aircraftRegistration != null && (
              <td>{flight.departure.aircraftRegistration}</td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default FlightInfoDeparture;
