import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" exact>
            Home
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ml-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!auth ? (
              <NavLink to="/register" exact>
                Register
              </NavLink>
            ) : (
              ""
            )}
            {!auth ? (
              <NavLink to="/login" exact>
                Login
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={logout}>
                Logout
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
