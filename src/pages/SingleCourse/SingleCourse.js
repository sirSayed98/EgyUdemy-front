/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourse } from "../../store/actions/coursesAction";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Description";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SubjectIcon from "@material-ui/icons/Subject";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Navbar from "../../components/Navbar/Navbar";

import SectionsContainer from "./../../components/Containers/SectionsContainer";

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
  const [list, setList] = useState([]);
  const { singleCourse } = useSelector((state) => state.courses);
  const { sections } = singleCourse;
  useEffect(() => {
    let id = match?.params?.id;
    if (id) dispatch(getSingleCourse(id));
  }, [match, dispatch]);

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
      </div>
    </>
  );
};

export default SingleCourse;
