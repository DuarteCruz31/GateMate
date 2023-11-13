import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image1 from "../assets/allflights/1.jpeg";

function AllFlights() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        <div>
          <img className="h-full w-full object-cover" src={image1} />
        </div>
        <div class="p-20">
          <div class="justify-start items-center inline-flex">
            <div class="text-sky-950 text-5xl font-bold leading-10">
              Find and subscribe flights here
            </div>
          </div>
          <div class="relative mt-5">
            <div class="w-1/4 ml-1 mr-1 pl-3 pr-4 py-3.5 bg-gray-100 justify-start items-start inline-flex">
              <select class="w-full text-zinc-600 text-xl font-normal outline-none">
                <option value="" selected disabled>
                  From
                </option>
              </select>
            </div>

            <div class="w-1/4 ml-1 mr-1 pl-3 pr-4 py-3.5 bg-gray-100 justify-start items-start inline-flex">
              <select class="w-full text-zinc-600 text-xl font-normal outline-none">
                <option value="" selected disabled>
                  To
                </option>
              </select>
            </div>

            <div class="w-1/4 ml-1 mr-1 pl-3 pr-4 py-3.5 bg-gray-100 justify-start items-start inline-flex">
              <select class="w-full text-zinc-600 text-xl font-normal outline-none">
                <option value="" selected disabled>
                  Company
                </option>
              </select>
            </div>

            <div class="w-1/5 ml-1 bg-blue-700 rounded justify-center items-center inline-flex">
              <button class="w-full px-12 py-3.5 text-center text-white text-base font-bold leading-normal">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AllFlights;
