/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSection } from "../../store/actions/sectionAction";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import PDFContainer from "../../components/Containers/PDFContainer";
import VideoContainer from "../../components/Containers/VideoContainer";
import Navbar from "../../components/Navbar/Navbar";

const SingleSection = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { singleSection } = useSelector((state) => state.section);
  const { activitiesVideos, activitiesPDFs } = singleSection;

  useEffect(() => {
    if (match?.params?.id) dispatch(getSingleSection(match.params.id));
  }, [match]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) history.push("/login");
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="container">
        <Grid container className="mt-5 justify-content-center" spacing={2}>
          <Grid item xs={12} lg={8}>
            <Paper className="img-section border p-3 rounded">
              <img
                src="https://www.reliablesoft.net/wp-content/uploads/2019/08/digital-marketing-courses.png"
                alt=""
                className="img-style rounded"
              />
            </Paper>
          </Grid>
        </Grid>

        <Paper className="border mt-5 rounded p-3">
          <PDFContainer data={activitiesPDFs} />
          <div className="mt-5"></div>
          <VideoContainer data={activitiesVideos} />
        </Paper>
      </div>
    </>
  );
};

export default SingleSection;
