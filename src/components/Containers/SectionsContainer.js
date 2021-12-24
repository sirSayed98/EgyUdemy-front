import React from "react";
import { Link } from "react-router-dom";

//material UI

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import VideoCallIcon from "@material-ui/icons/VideoCall";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const SectionsContainer = ({ data, url = "edit-section" }) => {
  if (data?.length === 0)
    return <h3 className="text-center">No sections available</h3>;
  return (
    <>
      <Paper
        style={{
          maxHeight: "350px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        className="position-relative border"
      >
        {data?.map((el) => {
          return (
            <>
              <div key={el._id}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <img
                      src="https://www.reliablesoft.net/wp-content/uploads/2019/08/digital-marketing-courses.png"
                      alt="section-img"
                      style={{ height: "200px" }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Link to={`/${url}/${el._id}`}>
                      <p className="font-size-header text-center">{el.title}</p>
                      <p className="text-center">{el.description}</p>
                    </Link>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="d-flex align-items-center">
                        <VideoCallIcon fontSize="large" className="mx-2" />
                        {el.activitiesVideos.length}
                      </p>
                      <p className="d-flex align-items-center">
                        <PictureAsPdfIcon fontSize="large" className="mx-2" />
                        {el.activitiesPDFs.length}
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Divider />
            </>
          );
        })}
      </Paper>
    </>
  );
};

export default SectionsContainer;
