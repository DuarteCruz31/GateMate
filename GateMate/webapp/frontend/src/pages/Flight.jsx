import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";

function Flight() {
  const { id } = useParams();
  const { data: flight, error, isPending } = useFetch();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>

        <div className="flex-1">
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            {/* {flight && <InfoFlightCard flight={flight}></InfoFlightCard>} */}
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Flight;
