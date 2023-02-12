import React, {useEffect} from "react";
import { useState } from "react";
import Button from "./sub_components/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/form.css";
import "../styles/formMain.css";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("")
    const data = {
      username: user.username,
      password: user.password,
    };
    axios
      .post("http://localhost:5000/checkUser", data)
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/")
      })
      .catch((err) => {
        setErrors(err.response.data.message);
        errorPrint()
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const errorPrint = () => {
    if (errors.length > 0) {
      document.getElementsByClassName("passwordError")[0].innerHTML = errors;
    }
  };

  useEffect(() => {
    errorPrint();
    //printErrors();
  }, [errors]);

  return (
    <div className="container">
      <div className="row">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-items">
            <div className="form-item-name">Email</div>
            <div className="error-change">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
              <span className="usernameError"></span>
            </div>
          </div>
          <div className="form-items">
            <div className="form-item-name">Password</div>
            <div className="error-change">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <span className="passwordError"></span>
            </div>
          </div>
          <div className="forgot">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
          <Button />
        </form>
      </div>
    </div>
  );
}

export default Login;
