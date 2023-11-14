import React from "react";

function Filter({ type }) {
  const companies = [
    "TAP Air Portugal",
    "Air France",
    "American Airlines",
    "ASL Airlines France",
    "British Airways",
    "Catar Airways",
  ];
  const planeTypes = [
    "Boeing 747-400",
    "Airbus A-350-900",
    "Airbus A380-800",
    "Boeing 787-9 Dreamliner",
    "Boeing 737-800",
  ];
  const cities = ["Lisbon", "New York", "Madrid", "France"];

  return (
    <div>
      {type == "Company" && (
        <div>
          <div className="font-bold">Company</div>
          <hr />
          <div className="mt-3">
            <div>
              {companies.map((company) => (
                <div className="flex flex-row items-center">
                  <input type="checkbox" className="mr-2" />
                  <p>{company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {type == "PlaneType" && (
        <div>
          <div className="font-bold">Plane Type</div>
          <hr />
          <div className="mt-3">
            {planeTypes.map((planeType) => (
              <div className="flex flex-row items-center">
                <input type="checkbox" className="mr-2" />
                <p>{planeType}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {type == "City" && (
        <div>
          <div className="font-bold">City</div>
          <hr />
          <div className="mt-3">
            {cities.map((city) => (
              <div className="flex flex-row items-center">
                <input type="checkbox" className="mr-2" />
                <p>{city}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
