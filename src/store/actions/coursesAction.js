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

export const getCoursesTable = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.user.token}`,
      },
    };

    const { data } = await axios.get(
      endPoints.BASE_URL + endPoints.GET_ALL_COURSES + `/instructor`,
      config
    );

    dispatch({
      type: coursesTypes.GET_COURSES_TABLE,
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.user.token}`,
      },
    };

    dispatch({
      type: coursesTypes.SET_LOADER,
      payload: "",
    });
    await axios.delete(
      endPoints.BASE_URL + endPoints.GET_ALL_COURSES + `/${id}`,
      config
    );
    dispatch(getALLCourses());
    dispatch({
      type: coursesTypes.COURSE_SUCESS,
      payload: "",
    });
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

export const editCourse = (id, form) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.user.token}`,
      },
    };

    dispatch({
      type: coursesTypes.SET_LOADER,
      payload: "",
    });
    await axios.put(
      endPoints.BASE_URL + endPoints.GET_ALL_COURSES + `/${id}`,
      form,
      config
    );
    dispatch(getSingleCourse(id));
    dispatch({
      type: coursesTypes.COURSE_SUCESS,
      payload: "",
    });
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

export const addSection = (id, form) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.user.token}`,
      },
    };

    dispatch({
      type: coursesTypes.SET_LOADER,
      payload: "",
    });
    await axios.post(
      `${endPoints.BASE_URL}/sections/course/${id}`,
      form,
      config
    );
    dispatch(getSingleCourse(id));
    dispatch({
      type: coursesTypes.COURSE_SUCESS,
      payload: "",
    });
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
