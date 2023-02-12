import React, { useEffect, useState } from "react";
import Button from "./sub_components/button";
import axios from "axios";
import "../styles/form.css";
import "../styles/formMain.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [searchparams] = useSearchParams();

  const [user, setUser] = useState({
    otp: "",
    username: "",
    password: "",
    date: "",
  });

  const setEmail = () => {
    setUser({ ...user, username: searchparams.get("email") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail();
    setDate();
    const data = {
      otp: user.otp,
      username: user.username,
      password: user.password,
      date: user.date,
    };
    axios
      .post("http://localhost:5000/checkOTP", data)
      .then((response) => {
        alert("Password updated successfully");
        navigate("/login");
      })
      .catch((error) => {
        alert("OTP did not match");
        navigate("/forgotPassword");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const setDate = () => {
    const date = Date.now();
    setUser({ ...user, date: date });
  };

  useEffect(() => {
    setDate();
    setEmail();
  }, [searchparams]);

  return (
    <div className="container">
      <div className="row">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-items">
            <div className="form-item-name">OTP</div>
            <div className="error-change">
              <input
                type="text"
                name="otp"
                value={user.otp}
                onChange={handleChange}
              />
              <span className="usernameError"></span>
            </div>
          </div>
          <div className="form-items">
            <div className="form-item-name">New Password</div>
            <div className="error-change">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <span className="usernameError"></span>
            </div>
          </div>
          <Button />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
