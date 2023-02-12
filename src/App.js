import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import "./App.css";
import NavbarCustom from "./components/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from "./components/forgotPassword";
import EnterOTP from "./components/enterOTP";

function App() {
  return (
    <Router>
      <NavbarCustom />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword"  element={<ForgotPassword />}/>
        <Route path="/enterOTP" element={<EnterOTP />} />
      </Routes>
    </Router>
  );
}

export default App;
