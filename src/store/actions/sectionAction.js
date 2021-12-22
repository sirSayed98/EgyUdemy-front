/* eslint-disable no-unused-vars */
import * as coursesTypes from "../constants/coursesTypes";
import * as sectionTypes from "../constants/sectionsTypes";
import * as endPoints from "../constants/endPoints";
import axios from "axios";
import { getSingleCourse } from "./coursesAction";
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
      type: sectionTypes.ADD_SECTION_SUCESS,
      payload: "",
    });
  } catch (error) {
    let err = error?.response?.data?.error;
    dispatch({
      type: sectionTypes.ADD_SECTION_FAIL,
      payload: err,
    });
  }
  setTimeout(() => {
    dispatch({
      type: sectionTypes.RESET_FLAGS_SECTION,
      payload: "",
    });
  }, 2000);
};
