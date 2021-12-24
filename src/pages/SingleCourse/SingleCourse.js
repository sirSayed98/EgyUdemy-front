/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Description";
import SubjectIcon from "@material-ui/icons/Subject";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Navbar from "../../components/Navbar/Navbar";
import SectionsContainer from "./../../components/Containers/SectionsContainer";
import { getSingleCourse } from "../../store/actions/coursesAction";
import { addQuestion, addAnswer } from "../../store/actions/coursesAction";
import { Divider } from "@material-ui/core";

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

const SingleCourse = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [list, setList] = useState([]);
  const [state, setState] = useState({
    title: "",
  });
  const [stateAnswer, setStateAnswer] = useState({
    answer: "",
  });

  const { singleCourse } = useSelector((state) => state.courses);
  const { FAQs } = singleCourse;
  const { user } = useSelector((state) => state.user);
  const { sections, load } = singleCourse;

  useEffect(() => {
    let id = match?.params?.id;
    if (id) dispatch(getSingleCourse(id));
  }, [match, dispatch]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onChangeAnswer = (e) => {
    setStateAnswer({ ...stateAnswer, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (user === null) {
      history.push("/login");
      return;
    }
    dispatch(addQuestion(match?.params?.id, state));
    setState({
      title: "",
    });
  };
  const onSubmitAnswer = (e, id) => {
    e.preventDefault();
    if (user === null) {
      history.push("/login");
      return;
    }
    dispatch(addAnswer(match?.params?.id, id, stateAnswer));
    setStateAnswer({ answer: "" });
    [...document.getElementsByClassName("form-control")].forEach((el) => {
      el.value = "";
    });
  };

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
        {
          id: 5,
          icon: <AssignmentIndIcon />,
          text: `By ${singleCourse?.instructor?.userName}`,
        },
      ]);
    }
  }, [singleCourse]);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Grid container spacing={3} className="align-items-center">
          <Grid xs={12} lg={8} item>
            <Paper className="img-section border p-3 rounded">
              <img
                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
                alt=""
                height={"400px"}
                width={"100%"}
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </Paper>
          </Grid>
          <Grid xs={12} lg={4}>
            <Paper className="p-3 rounded">
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
            </Paper>
          </Grid>
        </Grid>

        <Paper className="rounded mt-5 p-3">
          <h2 className="font-header text-center">Sections</h2>
          <SectionsContainer url="section" data={sections} />
        </Paper>
        <Grid container spacing={3} className="mt-5">
          <Grid item xs={12} lg={8}>
            <Paper
              className="rounded border p-3"
              style={{ maxHeight: "400px", overflowY: "scroll" }}
            >
              <h2 className="font-header text-center mt-3">FAQs</h2>
              {FAQs &&
                FAQs.map((question) => {
                  return (
                    <Paper className="border p-3 my-3" key={question.id}>
                      <h1 className="text-danger font-header">
                        {question.title}
                      </h1>
                      <div className="d-flex justify-content-between">
                        <span className="d-block font-header">
                          <small>{question.createdAt?.split("T")[0]}</small>
                        </span>
                        <span className="d-block font-header">
                          ( {question.answers?.length} )answers
                        </span>
                      </div>
                      <Divider />
                      <div>
                        <form
                          onSubmit={(e) => {
                            onSubmitAnswer(e, question._id);
                          }}
                        >
                          <div className="py-2 mt-3">
                            <input
                              onChange={onChangeAnswer}
                              className="form-control w-100"
                              type="text"
                              name="answer"
                              required
                              placeholder="answer"
                              style={{ borderRadius: "40px" }}
                            ></input>
                          </div>
                        </form>
                        <Divider />
                        {question.answers.map((el) => {
                          return (
                            <Paper className="px-2 border my-2" key={el._id}>
                              <div>
                                <div className="d-flex p-2">
                                  <img
                                    className="rounded-circle d-block"
                                    style={{ width: "50px", height: "50px" }}
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                    alt="img"
                                  />
                                  <div className="d-flex justify-content-between  w-100">
                                    <span className="d-block font-header mx-2">
                                      {el.userName}
                                    </span>
                                    <span className="d-block font-header mx-2">
                                      {el.createdAt?.split("T")[0]}
                                    </span>
                                  </div>
                                </div>
                                <div className="m-2">{el.answer}</div>
                              </div>
                            </Paper>
                          );
                        })}
                      </div>
                    </Paper>
                  );
                })}
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper className="rounded border px-3">
              <h2 className="font-header text-center mt-3">
                Do you have a Question?
              </h2>
              <form onSubmit={onSubmit}>
                <div className="py-2">
                  <TextField
                    required
                    size="small"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    fullWidth
                    value={state.title}
                    onChange={onChange}
                  />
                </div>
                <div className="py-3">
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
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SingleCourse;
