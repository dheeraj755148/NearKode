import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./sub_components/button";
import axios from "axios";
import "../styles/form.css";
import "../styles/formMain.css";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  const initialError = {
    nameError: "",
    usernameError: "",
    passwordError: "",
  };

  const [errors, setErrors] = useState(initialError);

  //Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //initialStatus();
    if (errorCheck()) {
      const data = {
        name: user.name,
        username: user.username,
        password: user.password,
      };
      axios.post("http://localhost:5000/create", data).then((res) => {
        alert("User created successfully");
        navigate("/login");
      });
    } else {
      errorCheck();
      printErrors();
    }
  };

  const initialStatus = () => {
    setErrors((errors) => ({ ...errors, ...initialError }));
  };

  //Check errors in form submitted
  const errorCheck = () => {
    var status = true;
    if (user.name === "") {
      setErrors((errors) => ({ ...errors, nameError: "Name cannot be empty" }));
      status = false;
    }
    if (validateEmail(user.username) === null) {
      setErrors((errors) => ({ ...errors, usernameError: "Email is invalid" }));
      status = false;
    }
    if (user.password.length < 8) {
      setErrors((errors) => ({
        ...errors,
        passwordError: "Password must be at least 8 characters",
      }));

      status = false;
    }
    return status;
  };

  //Regex for email validation
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //Update state onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const printErrors = () => {
    Object.entries(errors).map(([key, value]) => {
      document.getElementsByClassName(key)[0].innerHTML = value;
    });
  };

  useEffect(() => {
    initialStatus();
    errorCheck();
    //printErrors();
  }, [user]);

  return (
    <div className="container">
      <div className="row">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-items">
            <div className="form-item-name">Name</div>
            <div className="error-change">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <span className="nameError"></span>
            </div>
          </div>
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
          <Button />
        </form>
      </div>
    </div>
  );
}
export default Register;
