/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {
  editUserDetails,
  changePassword,
} from "../../store/actions/userAction";
import { popUpMessage } from "../../utils/sweetAlert";
const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const history = useHistory();
  const [state, setState] = useState();
  const [password, setPassword] = useState({ password: "" });
  const { user, success, err, redirect } = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) history.push("/login");
  }, [user]);

  const onChange = (e) => {
    setEdit("edit");
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user) {
      setUserState();
    }
  }, [user]);

  const onChangePassword = (e) => {
    setEdit("password");
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (edit === "password") {
      dispatch(changePassword(password));
    } else {
      dispatch(editUserDetails(state));
    }
  };
  const setUserState = () => {
    var obj = {};
    [
      "firstName",
      "lastName",
      "birthDate",
      "email",
      "userName",
      "role",
      "instructorDesc",
    ].forEach((el) => {
      obj[el] = user[el];
    });
    setState(obj);
  };

  useEffect(() => {
    if (success) {
      popUpMessage("Edit Successful", "Done!", "success");
    } else if (err) {
      popUpMessage("Edit Fail", err, "error");
    } else if (redirect) {
      popUpMessage("Change Password Done!", "Login now", "success");
      dispatch({
        type: "LOGOUT",
      });
    }
    setEdit(null);
  }, [err, success, redirect]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Paper className="border rounded w-100 mt-5 p-2">
          <Grid
            container
            spacing={3}
            className="justify-content-between align-items-center"
          >
            <Grid xs={12} lg={4} item>
              <Paper className="p-2">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="userphoto"
                  className="rounded-circle"
                  style={{ width: "100%", height: "100%", maxHeight: "300px" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper className="border p-3">
                <h3 className="text-center font-header">User Info</h3>
                <form onSubmit={onSubmit}>
                  <div className="my-3">
                    <TextField
                      size="small"
                      label="First Name"
                      variant="outlined"
                      type="text"
                      required
                      className="w-100"
                      name="firstName"
                      value={state?.firstName}
                      onChange={onChange}
                      disabled={edit === "password"}
                    />
                  </div>
                  <div className="my-3">
                    <TextField
                      size="small"
                      label="Last Name"
                      variant="outlined"
                      type="email"
                      required
                      className="w-100"
                      name="lastName"
                      value={state?.lastName}
                      onChange={onChange}
                      disabled={edit === "password"}
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
                      value={state?.userName}
                      onChange={onChange}
                      disabled={edit === "password"}
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
                      value={state?.email}
                      onChange={onChange}
                      disabled={edit === "password"}
                    />
                  </div>
                  <div className="my-3">
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      type="date"
                      name="birthDate"
                      value={state?.birthDate}
                      onChange={onChange}
                      size="small"
                      disabled={edit === "password"}
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
                      onChange={onChangePassword}
                      disabled={edit === "edit"}
                    />
                  </div>
                  <div className="my-3">
                    <TextField
                      size="small"
                      className="w-100"
                      label="Role"
                      variant="outlined"
                      type="text"
                      required
                      name="role"
                      value={state?.role}
                      disabled
                    />
                  </div>
                  {user?.role !== "learner" && (
                    <div className="my-3">
                      <TextField
                        size="small"
                        className="w-100"
                        label="Description"
                        variant="outlined"
                        type="text"
                        required
                        name="instructorDesc"
                        value={state?.instructorDesc}
                        onChange={onChange}
                        disabled={edit === "password"}
                      />
                    </div>
                  )}
                  <div className="my-2">
                    <div className="d-flex my-2">
                      <Button
                        fullWidth
                        className="btn mx-1"
                        variant="contained"
                        color="secondary"
                        disabled={edit === "edit"}
                        onClick={() => {
                          setEdit("password");
                        }}
                      >
                        Change Password
                      </Button>
                      <Button
                        fullWidth
                        className="bg-second btn mx-1"
                        variant="contained"
                        disabled={edit === null}
                        onClick={() => {
                          setEdit(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="d-flex">
                      <Button
                        fullWidth
                        color="primary"
                        className="btn mx-1"
                        variant="contained"
                        disabled={edit === "password"}
                        onClick={() => {
                          setEdit("edit");
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        fullWidth
                        color="primary"
                        className="mx-1 bg-second btn"
                        variant="contained"
                        disabled={edit === null}
                        onClick={onSubmit}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default Profile;
