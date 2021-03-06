/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Navbar from "../../components/Navbar/Navbar";
import { popUpMessage } from "../../utils/sweetAlert";
//redux
import { register } from "../../store/actions/userAction";

import "./Register.css";
const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, err, success } = useSelector((state) => state.user);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "learner",
    password: "",
    birthDate: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(register(state));
  };
  useEffect(() => {
    if (success) {
      popUpMessage("Register Successful", "Explore EgyUdemy", "success");
      history.push("/");
    } else if (err) {
      popUpMessage("Register Fail", err, "error");
    }
  }, [err, success, history]);

  useEffect(() => {
    if (user) history.push("/");
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center vh-100 align-items-center mt-3">
        <Paper>
          <form onSubmit={onSubmit} className="register-form">
            <div className="d-flex justify-content-center">
              <img
                className="d-block register-logo"
                src="./logos/logo.png"
                alt="logo"
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="First Name"
                variant="outlined"
                type="text"
                required
                className="w-100"
                name="firstName"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="Last Name"
                variant="outlined"
                type="text"
                required
                className="w-100"
                name="lastName"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="Username"
                variant="outlined"
                type="text"
                required
                className="w-100"
                name="userName"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="Email"
                variant="outlined"
                type="email"
                required
                className="w-100"
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                required
                fullWidth
                variant="outlined"
                type="date"
                name="birthDate"
                onChange={onChange}
                size="small"
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
                name="password"
                onChange={onChange}
              />
            </div>

            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>

                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={state.role}
                  onChange={onChange}
                >
                  <div
                    style={{ width: "385px" }}
                    className="d-flex justify-content-center"
                  >
                    <FormControlLabel
                      value="learner"
                      control={<Radio color="primary" />}
                      label="Learner"
                    />
                    <FormControlLabel
                      value="instructor"
                      control={<Radio color="primary" />}
                      label="Instructor"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <Button
                onClick={onSubmit}
                className="w-100 btn"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
            <div className="mt-2">
              <span>Do you have account? </span>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default Register;
