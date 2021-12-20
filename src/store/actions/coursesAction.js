/* eslint-disable no-unused-vars */
import * as coursesTypes from "../constants/coursesTypes";
import * as endPoints from "../constants/endPoints";
import axios from "axios";

export const getALLCourses = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      endPoints.BASE_URL + endPoints.GET_ALL_COURSES,
      config
    );

    dispatch({
      type: coursesTypes.GET_COURSES,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const getSingleCourse = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      endPoints.BASE_URL + endPoints.GET_ALL_COURSES + `/${id}`,
      config
    );

    dispatch({
      type: coursesTypes.GET_SINGLE_COURSES,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
  }
};
export const createCourse = (form) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.user.token}`,
      },
    };

    await axios.post(
      endPoints.BASE_URL + endPoints.GET_ALL_COURSES,
      form,
      config
    );

    dispatch({
      type: coursesTypes.COURSE_SUCESS,
      payload: "",
    });
    dispatch(getALLCourses());
  } catch (error) {
    let err = error?.response?.data?.error;
    console.log(error.response);
    dispatch({
      type: coursesTypes.COURSE_FAIL,
      payload: err,
    });
  }
  setTimeout(() => {
    dispatch({
      type: coursesTypes.RESET_FLAGS,
      payload: "",
    });
  }, 2000);
};
