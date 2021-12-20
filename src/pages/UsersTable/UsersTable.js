/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Navbar from "../../components/Navbar/Navbar";

import { getAllUsers, changeUserRole } from "./../../store/actions/userAction";

import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    maxWidth: 650,
  },
});

const UsersTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const { user, usersTable, loadReq } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (user === null || !(user?.role === "admin")) history.push("/");
  }, [user]);

  const changeUser = (id, currentRole) => {
    if (currentRole === "learner") dispatch(changeUserRole(id));
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 d-flex justify-content-center">
        {!loadReq ? (
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersTable.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.userName}
                    </TableCell>

                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">
                      {row.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      <LockOpenIcon
                        className="cursor"
                        onClick={() => {
                          changeUser(row._id, row.role);
                        }}
                        color={row.role === "learner" ? "primary" : "disabled"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          "LOADING"
        )}
      </div>
    </>
  );
};

export default UsersTable;
