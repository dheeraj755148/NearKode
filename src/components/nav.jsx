import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";

function NavbarCustom() {

  const auth = localStorage.getItem("userData");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="nav-parent">
      <div className="left-content">
        <NavLink to="/" exact>
          Home
        </NavLink>
      </div>
      <div className="right-content">
        <ul>
          <li>
            {!auth? <NavLink to="/register" exact>
              Register
            </NavLink> : ""}
            
          </li>
          <li>
            {!auth? <NavLink to="/login" exact>
              Login
            </NavLink>: <NavLink to="/login" onClick={logout}>Logout</NavLink>
            }
          
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarCustom;
