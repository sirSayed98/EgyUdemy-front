import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles({
  root: {
    width: 350,
    height: "100%",
  },
  media: {
    height: 140,
  },
});

const CustomCard = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push(`/course/${data.id}`);
  };
  return (
    <>
      {data && (
        <div className="my-3 position-relative">
          <Card onClick={handleClick} className={classes.root}>
            <div
              style={{ height: "100%" }}
              className="d-flex flex-column justify-content-between"
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                  </Typography>

                  <Typography gutterBottom variant="h6" component="h6">
                    Level : {data.level}
                  </Typography>
                  <Typography
                    className="d-flex align-items-center"
                    gutterBottom
                    variant="h6"
                    component="h6"
                  >
                    Cost : {data.cost} <AttachMoneyIcon />
                  </Typography>
                  <Typography
                    className="d-flex align-items-center"
                    gutterBottom
                    variant="h6"
                    component="h6"
                  >
                    Duration : {data.duration}{" "}
                    <CalendarTodayIcon className="mx-2" />
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    By : {data.instructor}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center  w-100">
                  <Button
                    className="btn"
                    onClick={handleClick}
                    size="small"
                    color="primary"
                  >
                    Learn More
                  </Button>
                </div>
              </CardActions>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default CustomCard;
