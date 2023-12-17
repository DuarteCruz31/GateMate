import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image1 from "../assets/home/1.jpeg";
import image2 from "../assets/home/2.png";
import image3 from "../assets/home/3.png";
import image4 from "../assets/home/4.png";
import image5 from "../assets/home/5.png";
import image6 from "../assets/home/6.png";
import image7 from "../assets/home/7.png";
import image8 from "../assets/home/8.png";
import image9 from "../assets/home/9.png";
import image10 from "../assets/home/10.png";

function Home() {
  const token = localStorage.getItem("token");

  const validateUserToken = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      const responseContent = await response.text();
      if (response.status === 200) {
        console.log(responseContent);
        window.location.href = "/allflights";
      } else if (response.status === 401) {
        console.error(responseContent);
        localStorage.removeItem("token");
        localStorage.setItem("invalidToken", true);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        <div className="relative">
          <img className="h-full w-full object-cover" src={image1} />
          <div className="absolute inset-y-0 left-20 flex flex-col items-start justify-center">
            <div className="text-white text-8xl font-bold mb-4">GateMate</div>
            <div className="text-white text-base mb-10">
              Elevate Your Journey with Real-time Flight Intelligence and Ease
            </div>
            <div>
              <button
                className="bg-teal-500 text-black text-center px-6 py-5 rounded-lg font-bold text-lg hover:text-white hover:bg-teal-600 transition duration-300 ease-in-out mr-6"
                onClick={() => {
                  if (token) {
                    validateUserToken(token);
                  } else {
                    window.location.href = "/login";
                  }
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 mb-10">
          <div className="text-blue-800 text-4xl text-center font-bold">
            Elevate Your Aviation Strategy with GateMate
          </div>
          <div className="mt-8 text-center text-gray-600 text-base tracking-tight">
            Revolutionizing the industry by optimizing pricing, planning routes,
            and analyzing market trends.
          </div>
          <div className="mt-8 flex flex-wrap justify-center">
            <div className="flex justify-center w-1/3 p-4">
              <div className="text-center">
                <img src={image2} alt="Plan routes" />
                <div>Plan routes</div>
              </div>
            </div>
            <div className="flex justify-center w-1/3 p-4">
              <div className="text-center">
                <img src={image3} alt="Receive gate directions" />
                <div>Receive gate directions</div>
              </div>
            </div>
            <div className="flex justify-center w-1/3 p-4">
              <div className="text-center">
                <img src={image4} alt="Check all flights" />
                <div>Check all flights</div>
              </div>
            </div>
            <div className="flex justify-center w-1/3 p-4">
              <div className="text-center">
                <img src={image5} alt="Know your gates" />
                <div>Know your gates</div>
              </div>
            </div>
            <div className="flex justify-center w-1/3 p-4">
              <div className="text-center">
                <img src={image6} alt="Track your favourite flights" />
                <div>Track your favourite flights</div>
              </div>
            </div>
            <div className="flex justify-center w-1/3 p-4">
              <div className="text-center">
                <img
                  src={image7}
                  alt="Identify unserved & underserved routes"
                />
                <div>Identify unserved & underserved routes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 bg-gray-100 py-10">
          <div className="flex flex-col items-center ">
            <div className="text-blue-800 text-4xl font-bold w-1/2 text-center">
              Empowering You with Global Insights
            </div>
            <div className="text-gray-600 text-base font-normal leading-7 tracking-tight mt-8 w-5/6 text-center">
              Discover where people plan to travel in the next 12 months,
              respond swiftly to market changes, and stay ahead of emerging
              travel trends
            </div>
          </div>
          <div className="mt-10 flex flex-col w-9/12">
            <div className="flex items-center mb-8">
              <div className="w-1/3">
                <img src={image8} alt="One Source, 100 Million Insights" />
              </div>
              <div className="w-2/3 ml-10 flex items-center">
                <div>
                  <div className="mb-2 text-blue-800 text-4xl font-bold leading-10">
                    One Source, 100 Million Insights
                  </div>
                  <div className="text-gray-600 text-base font-normal leading-7 tracking-tight">
                    Access worldwide traveler data from a single, trusted
                    source. As the leading travel search engine in Europe,
                    Asia-Pacific, and the Americas, GateMate provides the
                    largest coverage with an unbiased view of global travel
                    trends
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-2/3 mr-4 flex items-center">
                <div>
                  <div className="mb-2 text-blue-800 text-4xl font-bold leading-10">
                    Flight Subscriptions Made Easy
                  </div>
                  <div className="text-gray-600 text-base font-normal leading-7 tracking-tight">
                    Subscribe to your flights for personalized notifications.
                    GateMate keeps you updated on changes, ensuring a
                    stress-free travel experience
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <img src={image9} alt="Flight Subscriptions Made Easy" />
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-1/3">
                <img src={image10} alt="Stay Informed, Anywhere" />
              </div>
              <div className="w-2/3 ml-10 flex items-center">
                <div>
                  <div className="mb-2 text-blue-800 text-4xl font-bold leading-10">
                    Stay Informed, Anywhere
                  </div>
                  <div className="text-gray-600 text-base font-normal leading-7 tracking-tight">
                    Receive instant gate notifications wherever you are, making
                    sure you're always aware of changes that impact your journey
                  </div>
                </div>
              </div>
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

export default Home;
