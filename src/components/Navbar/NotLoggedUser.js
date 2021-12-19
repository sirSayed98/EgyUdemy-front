import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const NotLoggedUser = () => {
  return (
    <>
      <div className="d-flex un-register-control">
        <Link to={"/login"}>
          <Button className="btn" variant="contained" color="primary">
            <span className="d-block mx-2">Login</span>
          </Button>
        </Link>
        <Link to={"/register"}>
          <Button className="btn" color="primary">
            <span className="d-block mx-2">Register</span>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NotLoggedUser;
