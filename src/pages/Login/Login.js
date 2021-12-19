import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "./Login.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { popUpMessage } from "../../utils/sweetAlert";
import { login } from "../../store/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, err, success } = useSelector((state) => state.user);

  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //console.log(state);
    dispatch(login(state));
  };

  useEffect(() => {
    if (success) {
      popUpMessage("Login Successful", "Explore EgyUdemy", "success");
      history.push("/");
    } else if (err) {
      popUpMessage("Login Fail", err, "error");
    }
  }, [err, success, history]);

  useEffect(() => {
    if (user) history.push("/");
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center vh-100 align-items-center">
        <Paper>
          <form onSubmit={onSubmit} className="login-form">
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
                name="userName"
                className="w-100"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                className="w-100"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                required
                onChange={onChange}
              />
            </div>
            <div>
              <Button
                onClick={onSubmit}
                className="w-100 btn"
                variant="contained"
                color="primary"
              >
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
