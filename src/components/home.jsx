import React, { useState } from "react";
import "../styles/home.css"
function Home() {
  const auth = localStorage.getItem("userData");
  const [user, setUser] = useState(JSON.parse(auth));

  if (!user) {
    return (
      <div className="container">
        <div className="row">
          <p>Please login/register</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Welcome {user.name}</h1>
                        <p className="card-text">Your email is {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
