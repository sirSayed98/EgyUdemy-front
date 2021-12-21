/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import DescriptionIcon from "@material-ui/icons/Description";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SubjectIcon from "@material-ui/icons/Subject";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { getSingleCourse, editCourse } from "../../store/actions/coursesAction";
import { popUpMessage } from "../../utils/sweetAlert";
import "./EditCourse.css";
import Navbar from "./../../components/Navbar/Navbar";

const SkillStars = (level) => {
  if (level === "beginner") return <StarBorderIcon />;
  if (level === "intermediate")
    return (
      <>
        <StarBorderIcon />
        <StarBorderIcon className="mx-2" />
      </>
    );
  if (level === "advanced")
    return (
      <>
        <StarBorderIcon />
        <StarBorderIcon className="mx-2" />
        <StarBorderIcon className="mx-2" />
      </>
    );
};

const EditCourse = ({ match }) => {
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const { singleCourse, load, success, err } = useSelector(
    (state) => state.courses
  );
  const [state, setState] = useState({});

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (match?.params?.id) dispatch(getSingleCourse(match.params.id));
  }, []);

  useEffect(() => {
    if (singleCourse?.title) {
      setList([
        { id: 1, icon: <SubjectIcon />, text: singleCourse?.title },
        { id: 2, icon: <DescriptionIcon />, text: singleCourse?.description },
        {
          id: 3,
          icon: <CalendarTodayIcon />,
          text: `${singleCourse?.weeks} weeks`,
        },
        { id: 4, icon: <AttachMoneyIcon />, text: singleCourse?.tuition },
      ]);
      setState({ ...singleCourse });
    }
  }, [singleCourse]);

  useEffect(() => {
    if (success) {
      popUpMessage("Edit Successful", "done", "success");
      setEdit(false);
    } else if (err) {
      popUpMessage("Edit fail", err, "error");
    }
  }, [err, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {};

    let keys = ["title", "description", "weeks", "tuition", "minimumSkill"];
    keys.forEach((key) => {
      obj[key] = state[key];
    });

    dispatch(editCourse(match.params.id, obj));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header-container">
          <div className="img-container">
            <img
              className="img-style rounded"
              alt="alt"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
            />
          </div>
          <div className="data-container">
            {!edit && (
              <>
                <List>
                  {list.map((el) => {
                    return (
                      <ListItem key={el.id} button>
                        <ListItemIcon>{el.icon}</ListItemIcon>
                        <ListItemText primary={el.text} />
                      </ListItem>
                    );
                  })}
                  <ListItem button>
                    <ListItemIcon>
                      {SkillStars(singleCourse.minimumSkill)}
                    </ListItemIcon>
                    <ListItemText primary={singleCourse.minimumSkill} />
                  </ListItem>
                </List>
                <Divider />
                <List
                  onClick={() => {
                    setEdit(true);
                  }}
                  component="nav"
                  className="text-center"
                >
                  <div className="px-2">
                    <Button
                      fullWidth
                      className="bg-second btn"
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </div>
                </List>
              </>
            )}

            {edit && (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="my-3">
                    <TextField
                      size="small"
                      label="Title"
                      variant="outlined"
                      type="text"
                      required
                      name="title"
                      className="w-100"
                      value={state.title}
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
                      value={state.description}
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
                      value={state.weeks}
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
                      value={state.tuition}
                      onChange={onChange}
                    />
                  </div>
                  <div className="my-3">
                    <FormControl
                      size="small"
                      variant="outlined"
                      className="w-100"
                    >
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
                  <div className="my-3 d-flex">
                    <div className="w-100 mx-1">
                      <Button
                        fullWidth
                        variant="contained"
                        className="btn"
                        color="primary"
                        type="submit"
                        disabled={load}
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="w-100 mx-1">
                      <Button
                        onClick={() => {
                          setEdit(false);
                        }}
                        fullWidth
                        variant="contained"
                        className="btn"
                        color="secondary"
                        disabled={load}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
