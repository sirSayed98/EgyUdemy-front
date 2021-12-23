/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { popUpMessage } from "../../utils/sweetAlert";

import Navbar from "./../../components/Navbar/Navbar";
import MultiForm from "./MultiForm";

import {
  getSingleSection,
  editSection,
  AddActivities,
} from "../../store/actions/sectionAction";
const EditSection = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [edit, setEdit] = useState(null);
  const [state, setState] = useState({});

  //PDF
  const [PDFs, setPDFs] = useState([]);
  const [singlePDF, setSinglePdf] = useState(null);

  //Video
  const [Videos, setVideos] = useState([]);
  const [singleVideo, setSingleVideo] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { singleSection, err, success, load } = useSelector(
    (state) => state.section
  );

  useEffect(() => {
    if (match?.params?.id) dispatch(getSingleSection(match.params.id));
  }, [match]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editSection(match.params.id, state));
  };

  const onChangePDF = (e) => {
    setSinglePdf({ ...singlePDF, [e.target.name]: e.target.value });
  };

  const onChangeVideo = (e) => {
    setSingleVideo({ ...singleVideo, [e.target.name]: e.target.value });
  };

  const addSinglePdf = () => {
    setPDFs([...PDFs, singlePDF]);
  };

  const addSingleVideo = () => {
    setVideos([...Videos, singleVideo]);
  };

  const onSubmitPDF = (e) => {
    e.preventDefault();
    dispatch(AddActivities(match.params.id, PDFs, "pdf"));
  };

  const onSubmitVideo = (e) => {
    e.preventDefault();
    dispatch(AddActivities(match.params.id, Videos, "video"));
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
    if (success) {
      popUpMessage("Edit Section Successful", "done!", "success");
      flushState();
    } else if (err) {
      popUpMessage("Edit Section Fail", err, "error");
    }
  }, [err, success, history]);

  useEffect(() => {
    if (user === null || user.role === "learner") history.push("/");
  }, [user]);

  const flushState = () => {
    setEdit(null);
    setPDFs([]);
    setVideos([]);
    setSinglePdf(null);
    setSingleVideo(null);
  };

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
            {edit == null && (
              <>
                <Paper className="border px-4 py-2 rounded text-center">
                  <h3 className="font-header my-3">Title</h3>
                  <h6>{singleSection.title}</h6>
                  <h3 className="font-header my-3">Description</h3>
                  <h6>{singleSection.description}</h6>
                  <Button
                    fullWidth
                    className="bg-second btn my-2"
                    variant="contained"
                    onClick={() => {
                      setEdit("editSection");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth
                    className="bg-second btn my-2"
                    variant="contained"
                    onClick={() => {
                      setEdit("editPDFs");
                    }}
                  >
                    Add PDFs
                  </Button>
                  <Button
                    fullWidth
                    className="bg-second btn my-2"
                    variant="contained"
                    onClick={() => {
                      setEdit("editVideos");
                    }}
                  >
                    Add Videos
                  </Button>
                </Paper>
              </>
            )}
            {edit === "editSection" && (
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
                          disabled={load}
                        >
                          Submit
                        </Button>
                      </div>
                      <div className="w-100 mx-1">
                        <Button
                          onClick={() => {
                            setEdit(null);
                          }}
                          fullWidth
                          variant="contained"
                          className="btn"
                          color="secondary"
                          disabled={load}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </Paper>
              </>
            )}
            {edit === "editPDFs" && (
              <>
                <MultiForm
                  formTitle="Add PDFs"
                  data={PDFs}
                  submitHandler={onSubmitPDF}
                  changeHandler={onChangePDF}
                  addHandler={addSinglePdf}
                  flushState={flushState}
                  load={load}
                />
              </>
            )}
            {edit === "editVideos" && (
              <>
                <MultiForm
                  formTitle="Add Videos"
                  data={Videos}
                  submitHandler={onSubmitVideo}
                  changeHandler={onChangeVideo}
                  addHandler={addSingleVideo}
                  flushState={flushState}
                  load={load}
                />
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EditSection;
