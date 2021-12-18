import React from "react";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "./Login.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center vh-100 align-items-center">
        <Paper>
          <form className="login-form">
            <div className="d-flex justify-content-center">
              <img
                className="d-block login-logo"
                src="./logos/logo.png"
                alt="logo"
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="Email / Username"
                variant="outlined"
                type="email"
                required
                className="w-100"
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                className="w-100"
                label="Password"
                variant="outlined"
                type="password"
                required
              />
            </div>
            <div>
              <Button className="w-100" variant="contained" color="primary">
                Login
              </Button>
            </div>
            <div className="mt-2">
              <span>Doesn't have account? </span>
              <Link to="/register">
                <span>Register</span>
              </Link>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default Login;
