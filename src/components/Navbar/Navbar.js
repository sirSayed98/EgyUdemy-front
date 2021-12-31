/* eslint-disable no-unused-vars */

//react
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//material-ui
import Paper from "@material-ui/core/Paper";

import "./Navbar.css";
import NotLoggedUser from "./NotLoggedUser";
import Logout from "./Logout";
import LoggedUser from "./LoggedUser";
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Paper>
      <div className="container py-2">
        <div className="navbar">
          <div className="logo-container">
            <Link to="/">
              <span className="font-italic logo-text">EgyUdemy</span>
            </Link>
          </div>
          {!user && <NotLoggedUser />}

          {user && <LoggedUser />}
        </div>
      </div>
    </Paper>
  );
};

export default Navbar;
