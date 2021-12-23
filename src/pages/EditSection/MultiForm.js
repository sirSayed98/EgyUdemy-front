import React from "react";

//material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const MultiForm = ({
  formTitle,
  data,
  submitHandler,
  changeHandler,
  addHandler,
  flushState,
  load,
}) => {
  return (
    <>
      <Paper className="p-2">
        <h4 className="font-header text-center">{formTitle}</h4>
        <form onSubmit={submitHandler}>
          <div className="d-flex">
            {data.map((el) => {
              return (
                <span className="d-block mx-1 font-header">{el?.label}</span>
              );
            })}
          </div>
          <div className="my-3">
            <TextField
              size="small"
              label="Label"
              variant="outlined"
              type="text"
              required
              name="label"
              className="w-100"
              onChange={changeHandler}
            />
          </div>
          <div className="my-3">
            <TextField
              size="small"
              label="Src"
              variant="outlined"
              type="text"
              required
              name="src"
              className="w-100"
              onChange={changeHandler}
            />
          </div>
          <div className="my-3 d-flex">
            <div className="w-100 mx-1">
              <Button
                fullWidth
                variant="contained"
                className="btn"
                color="primary"
                disabled={load}
                onClick={addHandler}
              >
                ADD
              </Button>
            </div>
            <div className="w-100 mx-1">
              <Button
                onClick={flushState}
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
          <Button
            fullWidth
            className="bg-second btn"
            variant="contained"
            type="submit"
            disabled={data.length === 0 || load}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default MultiForm;
