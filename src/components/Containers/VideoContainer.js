import React from "react";
import Grid from "@material-ui/core/Grid";
const VideoContainer = ({ data }) => {
  return (
    <>
      <p className="font-header font-size-header text-center">Videos</p>
      <Grid container spacing={2}>
        {data &&
          data.map((el) => {
            return (
              <Grid item xs={12} lg={6} key={el}>
                <h3 className="font-header text-center">{el.label}</h3>
                <iframe
                  height="315"
                  width="100%"
                  src={`https://www.youtube.com/embed/${el.src}`}
                  title={el.label}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default VideoContainer;
