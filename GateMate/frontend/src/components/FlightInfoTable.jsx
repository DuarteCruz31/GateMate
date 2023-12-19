import React from "react";

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "Unavailable information";
  }

  let currentTimestamp = new Date(timestamp * 1000);

  if (isNaN(currentTimestamp.getTime())) {
    return "Invalid date";
  }

  let date = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(currentTimestamp);

  return date;
}

function FlightInfoArrival({ flight }) {
  return (
    <>
      <table className="table">
        <tbody>
          <tr className="bg-base-200">
            <th>Airport Name</th>
            <td>
              {flight.name == "null" ? "Unavailable information" : flight.name}
            </td>
          </tr>
          <tr>
            <th>Terminal</th>
            <td>
              {flight.terminal == "null"
                ? "Unavailable information"
                : flight.terminal}
            </td>
          </tr>
          <tr className="bg-base-200">
            <th>Gate</th>
            <td>
              {flight.gate == "null" ? "Unavailable information" : flight.gate}
            </td>
          </tr>
          <tr>
            <th>Delay</th>
            <td>
              {flight.delay == "null"
                ? "Unavailable information"
                : `${flight.delay} minutes`}
            </td>
          </tr>
          <tr className="bg-base-200">
            <th>Scheduled</th>
            <td>{formatTimestamp(flight.scheduled)}</td>
          </tr>
          <tr>
            <th>Estimated</th>
            <td>{formatTimestamp(flight.estimated)}</td>
          </tr>
          <tr className="bg-base-200">
            <th>Actual</th>
            <td>{formatTimestamp(flight.actual)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default FlightInfoArrival;
