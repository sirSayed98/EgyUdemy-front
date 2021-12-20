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

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import {
  getCoursesTable,
  deleteCourse,
} from "../../store/actions/coursesAction";

import { popUpMessage } from "../../utils/sweetAlert";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    maxWidth: 650,
  },
});

const CoursesTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const { user } = useSelector((state) => state.user);
  const { coursesTable, success, err, load } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(getCoursesTable());
  }, []);

  useEffect(() => {
    if (user === null || user.role === "learner") history.push("/");
  }, [user]);

  useEffect(() => {
    if (success) {
      popUpMessage(
        "Delete course Successful",
        "Explore your courses",
        "success"
      );
    } else if (err) {
      popUpMessage("Delete course fail", err, "error");
    }
  }, [success, err]);

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        {!load ? (
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Course Title</TableCell>
                  <TableCell align="center">Course ID</TableCell>
                  <TableCell align="right">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesTable.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        style={{ color: "red" }}
                        className="cursor"
                        title="delete"
                        onClick={() => {
                          dispatch(deleteCourse(row.id));
                        }}
                      />
                      <CreateIcon
                        color="primary"
                        className="cursor"
                        title="edit"
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

export default CoursesTable;
