import React, { useEffect, useState } from "react";
import Button from "./sub_components/button";
import axios from "axios";
import "../styles/form.css";
import "../styles/formMain.css";
import { useNavigate, createSearchParams } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    otpData: "658498",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createOTP();
    setDate();
    const data = {
      email: user.username,
      otp: user.otpData,
      date: user.date,
    };
    alert(`OTP is: ${data.otp}`);
    axios
      .post("http://localhost:5000/enterOTP", data)
      .then((response) => {
        navigate({
          pathname: "/enterOTP",
          search: createSearchParams({
            email: user.username,
          }).toString(),
        });
      })
      .catch((error) => {});
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

  const createOTP = () => {
    var otp = Math.floor(Math.random() * 900000);
    setUser({ ...user, otpData: otp });
  };

  useEffect(() => {
    createOTP();
    setDate();
  }, []);

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
          <Button />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
