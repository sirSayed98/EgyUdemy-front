/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import VideoCallIcon from "@material-ui/icons/VideoCall";

import DescriptionIcon from "@material-ui/icons/Description";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SubjectIcon from "@material-ui/icons/Subject";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { getSingleCourse, editCourse } from "../../store/actions/coursesAction";
import { popUpMessage } from "../../utils/sweetAlert";

import Navbar from "./../../components/Navbar/Navbar";
import {
  getSingleSection,
  editSection,
} from "../../store/actions/sectionAction";
const EditSection = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState({});

  const { user } = useSelector((state) => state.user);
  const { singleSection } = useSelector((state) => state.section);

  useEffect(() => {
    if (match?.params?.id) dispatch(getSingleSection(match.params.id));
  }, [match]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(editSection(match.params.id));
  };

  useEffect(() => {
    if (singleSection.title) {
      setState({
        title: singleSection.title,
        description: singleSection.description,
      });
    }
  }, [singleSection]);

  useEffect(() => {
    if (user === null || user.role === "learner") history.push("/");
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Grid container className="mt-5" spacing={2}>
          <Grid item xs={12} lg={8}>
            <Paper className="img-section border p-3 rounded">
              <img
                src="https://www.reliablesoft.net/wp-content/uploads/2019/08/digital-marketing-courses.png"
                alt=""
                className="img-style rounded"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            {!edit && (
              <>
                <Paper className="border px-4 py-2 rounded">
                  <p className="font-header my-3">Title</p>
                  <span>{singleSection.title}</span>
                  <p className="font-header my-3">Description</p>
                  <span>{singleSection.description}</span>
                  <Button
                    fullWidth
                    className="bg-second btn my-1"
                    variant="contained"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth
                    className="bg-second btn my-1"
                    variant="contained"
                  >
                    Add PDFs
                  </Button>
                  <Button
                    fullWidth
                    className="bg-second btn my-1"
                    variant="contained"
                  >
                    Add Videos
                  </Button>
                </Paper>
              </>
            )}
            {edit && (
              <>
                <Paper className="p-2">
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
                    <div className="my-3 d-flex">
                      <div className="w-100 mx-1">
                        <Button
                          fullWidth
                          variant="contained"
                          className="btn"
                          color="primary"
                          type="submit"
                          //disabled={load}
                        >
                          Submit
                        </Button>
                      </div>
                      <div className="w-100 mx-1">
                        <Button
                          onClick={() => {
                            setEdit(false);
                          }}
                          fullWidth
                          variant="contained"
                          className="btn"
                          color="secondary"
                          // disabled={load}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EditSection;
