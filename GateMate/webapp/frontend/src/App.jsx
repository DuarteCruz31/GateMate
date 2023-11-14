import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllFlights from "./pages/AllFlights";
import Flight from "./pages/Flight";
import FlightTracker from "./pages/FlightTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/allflights" Component={AllFlights} />
        <Route path="/allflights/:id" Component={Flight}></Route>
        <Route path="/flighttracker" Component={FlightTracker}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
