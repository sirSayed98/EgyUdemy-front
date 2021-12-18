import React from "react";
import "./Navbar.css";
import Paper from "@material-ui/core/Paper";
const Navbar = () => {
  return (
    <Paper>
      <div className="container py-2">
        <div className="navbar">
          <div className="logo-container">
            {/* <img className="logo-img" src="./logos/logo2.png" alt="" /> */}
            <span>EgyUdemy</span>
          </div>
          <div className="d-flex un-register-control">
            <span className="d-block mx-2">Login</span>
            <span className="d-block mx-2">Register</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Navbar;
