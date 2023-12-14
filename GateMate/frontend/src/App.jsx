import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllFlights from "./pages/AllFlights";
import Flight from "./pages/Flight";
import FlightTracker from "./pages/FlightTracker";
import UserSubscribedFlights from "./pages/UserSubscribedFlights";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/allflights" Component={AllFlights} />
        <Route path="/flighttracker" Component={FlightTracker}></Route>
        <Route path="/flightInfo/:id" element={<Flight />} />
        <Route
          path="/UserSubscribedFlights"
          Component={UserSubscribedFlights}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
