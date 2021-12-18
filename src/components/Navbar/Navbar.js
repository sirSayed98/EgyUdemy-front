/* eslint-disable no-unused-vars */

//react
import React from "react";
import { Link } from "react-router-dom";

//material-ui
import Paper from "@material-ui/core/Paper";

import "./Navbar.css";

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
            <Link to={"/login"}>
              <span className="d-block mx-2">Login</span>
            </Link>
            <Link to={"/register"}>
              <span className="d-block mx-2">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Navbar;
