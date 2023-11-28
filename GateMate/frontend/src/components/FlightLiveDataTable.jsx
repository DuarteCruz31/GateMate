import React from "react";

function FlightLiveDataTable({ flight }) {
  return (
    <>
      {flight.live_data == null && (
        <div className="alert bg-base-200" role="alert">
          No live data available for this flight
        </div>
      )}
      {flight.live_data != null && (
        <table className="table">
          <tbody>
            <tr className="bg-base-200">
              <th>Latitude</th>
              {flight.live_data.latitude == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.latitude != null && (
                <td>{flight.live_data.latitude}</td>
              )}
            </tr>
            <tr>
              <th>Longitude</th>
              {flight.live_data.longitude == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.longitude != null && (
                <td>{flight.live_data.longitude}</td>
              )}
            </tr>
            <tr className="bg-base-200">
              <th>Altitude</th>
              {flight.live_data.altitude == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.altitude != null && (
                <td>{flight.live_data.altitude}</td>
              )}
            </tr>
            <tr>
              <th>Direction</th>
              {flight.live_data.direction == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.direction != null && (
                <td>{flight.live_data.direction}</td>
              )}
            </tr>
            <tr className="bg-base-200">
              <th>Horizontal Speed</th>
              {flight.live_data.speed_horizontal == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.speed_horizontal != null && (
                <td>{flight.live_data.speed_horizontal}</td>
              )}
            </tr>
            <tr>
              <th>Vertical Speed</th>
              {flight.live_data.speed_vertical == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.speed_vertical != null && (
                <td>{flight.live_data.speed_vertical}</td>
              )}
            </tr>
            <tr className="bg-base-200">
              <th>Is Ground</th>
              {flight.live_data.is_ground == null && (
                <td>Unavailable information</td>
              )}
              {flight.live_data.is_ground != null && (
                <td>{flight.live_data.is_ground}</td>
              )}
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default FlightLiveDataTable;
