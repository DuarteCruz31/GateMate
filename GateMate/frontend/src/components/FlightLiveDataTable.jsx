import React from "react";

function FlightLiveDataTable({ flight }) {
  return (
    <>
      {flight == null && (
        <div className="alert bg-base-200" role="alert">
          No live data available for this flight
        </div>
      )}
      {flight != null && (
        <table className="table">
          <tbody>
            <tr className="bg-base-200">
              <th>Latitude</th>
              {flight.latitude == null && <td>Unavailable information</td>}
              {flight.latitude != null && <td>{flight.latitude}</td>}
            </tr>
            <tr>
              <th>Longitude</th>
              {flight.longitude == null && <td>Unavailable information</td>}
              {flight.longitude != null && <td>{flight.longitude}</td>}
            </tr>
            <tr className="bg-base-200">
              <th>Altitude</th>
              {flight.altitude == null && <td>Unavailable information</td>}
              {flight.altitude != null && <td>{flight.altitude}</td>}
            </tr>
            <tr>
              <th>Direction</th>
              {flight.direction == null && <td>Unavailable information</td>}
              {flight.direction != null && <td>{flight.direction}</td>}
            </tr>
            <tr className="bg-base-200">
              <th>Horizontal Speed</th>
              {flight.speed == null && <td>Unavailable information</td>}
              {flight.speed != null && <td>{flight.speed}</td>}
            </tr>
            <tr>
              <th>Vertical Speed</th>
              {flight.vertical_speed == null && (
                <td>Unavailable information</td>
              )}
              {flight.vertical_speed != null && (
                <td>{flight.vertical_speed}</td>
              )}
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default FlightLiveDataTable;
