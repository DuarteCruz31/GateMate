import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllFlights from "./pages/AllFlights";
import Info from "./pages/Info";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/allflights" Component={AllFlights} />
        <Route path="/info" Component={Info} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
