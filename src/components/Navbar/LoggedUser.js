import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";

import Logout from "./Logout";
import { Link } from "react-router-dom";

const adminMenu = [
  { id: 1, label: "Users", href: "/users" },
  { id: 2, label: "Courses", href: "/courses" },
  { id: 2, label: "Add Course", href: "add-course" },
];
const instructorMenu = [
  { id: 1, label: "Courses" },
  { id: 2, label: "Add Course" },
];

const LoggedUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenu, setUserMenu] = useState([]);

  const { user } = useSelector((state) => state.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user?.role === "admin") setUserMenu(adminMenu);
    else if (user?.role === "instructor") setUserMenu(instructorMenu);
  }, [user]);

  return (
    <>
      <span
        aria-haspopup="true"
        onClick={handleClick}
        className="d-block font-italic cursor"
      >
        Mohamed
      </span>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={"/profile"}>
          <MenuItem onClose={handleClose}>Profile</MenuItem>
        </Link>
        {userMenu.map((el) => {
          return (
            <Link to={el.href}>
              <MenuItem key={el.id} onClose={handleClose}>
                {el.label}
              </MenuItem>
            </Link>
          );
        })}

        <MenuItem onClick={handleClose}>
          <Logout />
        </MenuItem>
      </Menu>
    </>
  );
};

export default LoggedUser;
