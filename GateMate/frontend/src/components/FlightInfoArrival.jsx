import React from "react";

function FlightInfoArrival({ flight }) {
  return (
    <>
      <table className="table">
        <tbody>
          <tr className="bg-base-200">
            <th>Airport</th>
            {flight.arrival.airport == null && <td>Unavailable information</td>}
            {flight.arrival.airport != null && (
              <td>{flight.arrival.airport}</td>
            )}
          </tr>
          <tr>
            <th>Timezone</th>
            {flight.arrival.timezone == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.timezone != null && (
              <td>{flight.arrival.timezone}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Iata</th>
            {flight.arrival.iata == null && <td>Unavailable information</td>}
            {flight.arrival.iata != null && <td>{flight.arrival.iata}</td>}
          </tr>
          <tr>
            <th>Icao</th>
            {flight.arrival.icao == null && <td>Unavailable information</td>}
            {flight.arrival.icao != null && <td>{flight.arrival.icao}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Terminal</th>
            {flight.arrival.terminal == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.terminal != null && (
              <td>{flight.arrival.terminal}</td>
            )}
          </tr>
          <tr>
            <th>Gate</th>
            {flight.arrival.gate == null && <td>Unavailable information</td>}
            {flight.arrival.gate != null && <td>{flight.arrival.gate}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Delay</th>
            {flight.arrival.delay == null && <td>Unavailable information</td>}
            {flight.arrival.delay != null && <td>{flight.arrival.delay}</td>}
          </tr>
          <tr>
            <th>Scheduled</th>
            {flight.arrival.scheduled == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.scheduled != null && (
              <td>{flight.arrival.scheduled}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Estimated</th>
            {flight.arrival.estimated == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.estimated != null && (
              <td>{flight.arrival.estimated}</td>
            )}
          </tr>
          <tr>
            <th>Actual</th>
            {flight.arrival.actual == null && <td>Unavailable information</td>}
            {flight.arrival.actual != null && <td>{flight.arrival.actual}</td>}
          </tr>
          <tr className="bg-base-200">
            <th>Estimated Runway</th>
            {flight.arrival.estimatedRunway == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.estimatedRunway != null && (
              <td>{flight.arrival.estimatedRunway}</td>
            )}
          </tr>
          <tr>
            <th>Actual Runway</th>
            {flight.arrival.actualRunway == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.actualRunway != null && (
              <td>{flight.arrival.actualRunway}</td>
            )}
          </tr>
          <tr className="bg-base-200">
            <th>Aircraft Registration</th>
            {flight.arrival.aircraftRegistration == null && (
              <td>Unavailable information</td>
            )}
            {flight.arrival.aircraftRegistration != null && (
              <td>{flight.arrival.aircraftRegistration}</td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default FlightInfoArrival;
