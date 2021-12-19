import React from "react";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: {},
    });
  };

  return (
    <>
      <IconButton
        onClick={handleLogout}
        title="Logout"
        className="btn"
        color="primary"
      >
        <ExitToAppIcon />
      </IconButton>
    </>
  );
};

export default Logout;
