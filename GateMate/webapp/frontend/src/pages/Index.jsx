import { useState } from "react";
import "../css/index.css";
import frame3 from "../assets/frame-3.svg";

function Index() {
  const [count, setCount] = useState(0);
  return (
    <div className="element">
      <div className="div">
        <div className="frame">
          <div className="navbar-wrapper">
            <div className="navbar">
              <div className="text-wrapper">About us</div>
              <div className="text-wrapper-2">Distribution</div>
              <div className="text-wrapper-3">Data Products</div>
              <div className="text-wrapper-4">Advertising</div>
              <div className="text-wrapper-5">Affiliates</div>
              <div className="news-insights">News &amp; Insights</div>
              <div className="auto-layout">
                <div className="text-wrapper-6">Log in</div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlap">
          <div className="frame-wrapper">
            <div className="frame-2">
              <div className="auto-layout-2">
                <div className="frame-3">
                  <div className="text-wrapper-7">Travel Insight</div>
                  <p className="p">
                    Empower your business with insights from over 100 million
                    travellers a month.
                  </p>
                  <div className="div-wrapper">
                    <div className="text-wrapper-8">Request access</div>
                  </div>
                </div>
                <img className="img" alt="Frame" src="frame.svg" />
              </div>
              <p className="text-wrapper-9">
                Make better decisions using the flight search and redirect data
                of our global users. Grasp new opportunities faster, move
                forward with confidence and realise your potential.
              </p>
              <div className="frame-4">
                <div className="frame-5">
                  <p className="text-wrapper-10">What can we do for you?</p>
                  <p className="text-wrapper-11">
                    We’re helping leading airlines run more profitably, airports
                    find new customers, and destination and marketing agencies
                    understand demand.
                  </p>
                </div>
                <div className="auto-layout-3">
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image.png" />
                      <div className="text-wrapper-12">
                        Optimise pricing strategies
                      </div>
                    </div>
                  </div>
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image-2.png" />
                      <div className="text-wrapper-13">Plan routes</div>
                    </div>
                  </div>
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image-3.png" />
                      <div className="text-wrapper-14">
                        Analyse catchment areas
                      </div>
                    </div>
                  </div>
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image-4.png" />
                      <div className="text-wrapper-15">Analyse competitors</div>
                    </div>
                  </div>
                </div>
                <div className="auto-layout-4">
                  <div className="frame-6">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image-5.png" />
                      <div className="text-wrapper-16">
                        Know your travellers
                      </div>
                    </div>
                  </div>
                  <div className="frame-6">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image-6.png" />
                      <div className="text-wrapper-17">
                        Anticipate market trends
                      </div>
                    </div>
                  </div>
                  <div className="frame-6">
                    <div className="overlap-group">
                      <img className="image" alt="Image" src="image-7.png" />
                      <div className="text-wrapper-18">Analyse fares</div>
                    </div>
                  </div>
                  <div className="frame-6">
                    <div className="overlap-2">
                      <img className="image" alt="Image" src="image-8.png" />
                      <p className="identify-unserved">
                        Identify unserved &amp; underserved routes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="auto-layout-5">
                  <div className="text-wrapper-19">Learn more</div>
                </div>
              </div>
              <div className="auto-layout-vertical">
                <div className="text-wrapper-20">Data delivered your way</div>
                <div className="auto-layout-6">
                  <div className="frame-7">
                    <p className="text-wrapper-21">
                      Download a daily file from your SFTP server or Amazon S3
                      bucket.
                    </p>
                    <div className="auto-layout-7">
                      <div className="text-wrapper-22">Learn more</div>
                    </div>
                    <div className="frame-8">
                      <div className="text-wrapper-23">Reports</div>
                    </div>
                  </div>
                  <div className="frame-7">
                    <p className="text-wrapper-24">
                      Call our robust aggregated API for specific data insights
                      at any time.
                    </p>
                    <div className="auto-layout-8">
                      <div className="text-wrapper-22">Learn more</div>
                    </div>
                    <div className="frame-9">
                      <div className="text-wrapper-25">API</div>
                    </div>
                  </div>
                  <div className="frame-7">
                    <p className="text-wrapper-26">
                      Access, analyse and visualise data in your own personal
                      online portal.
                    </p>
                    <div className="auto-layout-9">
                      <div className="text-wrapper-22">Learn more</div>
                    </div>
                    <div className="frame-10">
                      <div className="text-wrapper-27">Vision</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="auto-layout-vertical-wrapper">
                <div className="auto-layout-vertical-2">
                  <div className="auto-layout-vertical-3">
                    <p className="text-wrapper-28">
                      Turn our global data into actionable insights
                    </p>
                    <p className="text-wrapper-29">
                      Know where people are looking to travel in the next 12
                      months, rapidly respond to market changes, and stay one
                      step ahead of emerging trends and travel habits.
                    </p>
                  </div>
                  <div className="auto-layout-vertical-4">
                    <div className="frame-11">
                      <img className="frame-12" alt="Frame" src="frame-2.svg" />
                      <div className="auto-layout-vertical-5">
                        <p className="text-wrapper-30">
                          100 million insights. One provider.
                        </p>
                        <p className="text-wrapper-31">
                          Get worldwide traveller data – all from one trusted
                          source. By joining the leading travel search engine in
                          Europe, Asia-Pacific and the Americas, you’ll have
                          access to the largest coverage available with an
                          unbiased outlook on global travel trends.
                        </p>
                      </div>
                    </div>
                    <div className="auto-layout-10">
                      <div className="auto-layout-vertical-6">
                        <div className="text-wrapper-32">
                          Evaluate real demand
                        </div>
                        <p className="text-wrapper-33">
                          Look beyond timetables, capacity and previous bookings
                          to understand the search and redirect behaviour behind
                          every flight and route. Identify gaps in the market
                          and take advantage of new opportunities faster.
                        </p>
                      </div>
                      <img className="frame-13" alt="Frame" src={frame3} />
                    </div>
                    <div className="frame-14">
                      <img className="frame-15" alt="Frame" src="frame-4.svg" />
                      <div className="auto-layout-vertical-7">
                        <p className="text-wrapper-34">
                          Understand the past, forecast the future
                        </p>
                        <p className="text-wrapper-35">
                          Make smarter decisions based on archives of historical
                          data. Stay one step ahead with fresh data that’s
                          delivered on demand or daily. And predict future
                          travel patterns by seeing where people are searching
                          and booking in the next 12 months.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="auto-layout-vertical-8">
                <p className="text-wrapper-36">
                  Don’t just take our word for it
                </p>
                <div className="frame-16">
                  <img className="image-2" alt="Image" src="image-9.png" />
                  <div className="frame-17">
                    <p className="text-wrapper-37">
                      Travel Insight is helping American Airlines win more
                      customers
                    </p>
                    <div className="in-such-a-dynamic-wrapper">
                      <p className="in-such-a-dynamic">
                        &#34;In such a dynamic and changing landscape, we use
                        Travel Insight to optimise fare pricing, create new
                        growth opportunities and remain competitive.&#34;
                      </p>
                    </div>
                    <div className="auto-layout-11">
                      <div className="text-wrapper-38">Read article</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="frame-18">
                <div className="overlap-3">
                  <div className="auto-layout-12">
                    <div className="frame-19">
                      <div className="frame-20">
                        <img
                          className="image-3"
                          alt="Image"
                          src="image-10.png"
                        />
                        <img
                          className="image-4"
                          alt="Image"
                          src="image-11.png"
                        />
                        <img
                          className="image-5"
                          alt="Image"
                          src="image-12.png"
                        />
                        <img
                          className="image-6"
                          alt="Image"
                          src="image-13.png"
                        />
                      </div>
                      <div className="frame-21">
                        <img
                          className="image-3"
                          alt="Image"
                          src="image-14.png"
                        />
                        <img
                          className="image-4"
                          alt="Image"
                          src="image-15.png"
                        />
                        <img
                          className="image-7"
                          alt="Image"
                          src="image-16.png"
                        />
                        <img
                          className="image-8"
                          alt="Image"
                          src="image-17.png"
                        />
                      </div>
                    </div>
                  </div>
                  <img className="image-9" alt="Image" src="image-18.png" />
                </div>
                <img className="image-10" alt="Image" src="image-19.png" />
              </div>
              <div className="auto-layout-13">
                <div className="auto-layout-vertical-9">
                  <p className="text-wrapper-20">
                    Find out more with a free trial.
                  </p>
                  <div className="auto-layout-14">
                    <div className="text-wrapper-22">Get Started</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-22">
            <div className="frame-23">
              <div className="frame-24">
                <p className="text-wrapper-39">
                  🚀 Get unrivalled insight into future travel demand with
                  Travel Insight Vision. 🚀
                </p>
                <div className="auto-layout-15">
                  <div className="text-wrapper-8">Go further</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-25">
          <div className="frame-26">
            <div className="auto-layout-16">
              <div className="auto-layout-vertical-10">
                <div className="frame-27">
                  <div className="text-wrapper-40">About Us</div>
                </div>
                <div className="frame-28">
                  <div className="text-wrapper-41">Sustainability</div>
                </div>
                <div className="frame-29">
                  <div className="text-wrapper-42">
                    Advertise with Skyscanner
                  </div>
                </div>
                <div className="frame-30">
                  <div className="text-wrapper-41">Travel Insight</div>
                </div>
              </div>
              <div className="auto-layout-vertical-11">
                <div className="frame-31">
                  <div className="text-wrapper-43">Flights Integrations</div>
                </div>
                <div className="frame-32">
                  <div className="text-wrapper-44">Hotels Integrations</div>
                </div>
                <div className="frame-33">
                  <div className="text-wrapper-45">Car Hire Integrations</div>
                </div>
              </div>
              <div className="auto-layout-vertical-12">
                <div className="frame-34">
                  <div className="text-wrapper-46">Affiliate Networks</div>
                </div>
                <div className="frame-35">
                  <div className="text-wrapper-47">Skyscanner Travel APIs</div>
                </div>
                <div className="frame-36">
                  <div className="text-wrapper-48">
                    Travel API Documentation
                  </div>
                </div>
              </div>
              <div className="auto-layout-vertical-13">
                <div className="frame-33">
                  <div className="news-case-studies">
                    News &amp; Case Studies
                  </div>
                </div>
                <div className="frame-37">
                  <div className="text-wrapper-49">Support</div>
                </div>
                <div className="frame-38">
                  <div className="text-wrapper-50">Get in touch</div>
                </div>
                <div className="frame-39">
                  <p className="text-wrapper-51">Log in to Partner Portal</p>
                </div>
              </div>
            </div>
            <div className="frame-40">
              <div className="frame-41" />
              <div className="overlap-wrapper">
                <div className="overlap-4">
                  <div className="overlap-group-2">
                    <div className="text-wrapper-52">
                      © 2002-2022 Skyscanner Ltd.
                    </div>
                    <div className="text-wrapper-53">&amp;</div>
                  </div>
                  <div className="frame-42">
                    <div className="text-wrapper-54">Privacy Policy</div>
                  </div>
                  <div className="frame-43">
                    <div className="text-wrapper-55">Terms of Service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
