import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Navbar from "../../components/Navbar/Navbar";
import { popUpMessage } from "../../utils/sweetAlert";
import { createCourse } from "../../store/actions/coursesAction";
import "./AddCourse.css";

// ["beginner", "intermediate", "advanced"]
const AddCourse = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success, err } = useSelector((state) => state.courses);

  const [state, setState] = useState({
    title: "",
    description: "",
    weeks: 0,
    tuition: 0,
    minimumSkill: "beginner",
    instructor: null,
  });
  const onSubmit = () => {
    dispatch(createCourse({ ...state, instructor: user._id }));
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user === null || user.role === "learner") history.push("/");
  }, [user]);

  useEffect(() => {
    if (success) {
      popUpMessage(
        "Create course Successful",
        "Explore your courses",
        "success"
      );
      history.push("/");
    } else if (err) {
      popUpMessage("Create course fail", err, "error");
    }
  }, [success, err]);

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center vh-100 w-100">
        <Paper className="add-course-form mt-3 px-3">
          <form onSubmit={onSubmit}>
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
                label="Title"
                variant="outlined"
                type="text"
                required
                name="title"
                className="w-100"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                className="w-100"
                label="Description"
                variant="outlined"
                type="text"
                name="description"
                required
                onChange={onChange}
                multiline
                minRows={3}
                maxRows={4}
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="Weeks"
                variant="outlined"
                type="number"
                required
                name="weeks"
                className="w-100"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <TextField
                size="small"
                label="Tuition"
                variant="outlined"
                type="number"
                required
                name="tuition"
                className="w-100"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <FormControl size="small" variant="outlined" className="w-100">
                <InputLabel>Skill</InputLabel>
                <Select
                  value={state.minimumSkill}
                  name="minimumSkill"
                  onChange={onChange}
                  label="Skill"
                >
                  <MenuItem value={"beginner"}>Beginner</MenuItem>
                  <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                  <MenuItem value={"advanced"}>Advanced</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                onClick={onSubmit}
                className="w-100 btn"
                variant="contained"
                color="primary"
              >
                Add Course
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default AddCourse;
