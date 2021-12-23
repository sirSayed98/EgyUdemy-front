/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { popUpMessage } from "../../utils/sweetAlert";
import { addSection } from "../../store/actions/sectionAction";
import SectionsContainer from "../../components/Containers/SectionsContainer";

const Sections = ({ sections, courseId }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const { load, success, err } = useSelector((state) => state.section);
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addSection(courseId, state));
  };

  useEffect(() => {
    if (success) {
      popUpMessage("Add section Successful", "done", "success");
      setState({
        title: "",
        description: "",
      });
    } else if (err) {
      popUpMessage("Add section Fail", err, "error");
    }
  }, [err, success]);
  return (
    <>
      <div className="section-container mt-5">
        <Divider />
        <p className="font-size-header font-header mt-3">Sections</p>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <SectionsContainer data={sections} />
          </Grid>
          <Grid item xs={12} lg={4} style={{ paddingTop: "0px" }}>
            <Paper className="p-3">
              <h4 className="font-header text-center">Add Section</h4>
              <form onSubmit={onSubmit}>
                <div className="my-2">
                  <TextField
                    size="small"
                    label="Title"
                    variant="outlined"
                    type="text"
                    required
                    name="title"
                    className="w-100"
                    value={state.title}
                    onChange={onChange}
                  />
                </div>
                <div className="my-3">
                  <TextField
                    className="w-100"
                    label="Description"
                    variant="outlined"
                    type="text"
                    name="description"
                    required
                    value={state.description}
                    onChange={onChange}
                    multiline
                    minRows={3}
                    maxRows={4}
                  />
                </div>
                <div className="my-2">
                  <Button
                    fullWidth
                    variant="contained"
                    className="btn"
                    color="primary"
                    type="submit"
                    disabled={load}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Sections;
