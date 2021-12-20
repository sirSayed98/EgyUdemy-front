/* eslint-disable no-unused-vars */
import * as userActionTypes from "../constants/userTypes";
import * as endPoints from "../constants/endPoints";
import axios from "axios";

export const login = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      endPoints.BASE_URL + endPoints.LOGIN,
      form,
      config
    );

    let storedData = JSON.parse(JSON.stringify(data.user));
    delete storedData.courses;
    delete storedData.progress;

    dispatch({
      type: userActionTypes.SET_USER,
      payload: data,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(storedData));

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    let err = error?.response?.data?.error;
    console.log(err);

    dispatch({
      type: userActionTypes.SET_ERR,
      payload: err,
    });
  }

  setTimeout(() => {
    dispatch({
      type: userActionTypes.RESET_FLAGS,
      payload: "",
    });
  }, 2000);
};

export const register = (form) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      endPoints.BASE_URL + endPoints.REGISTER,
      form,
      config
    );

    let storedData = JSON.parse(JSON.stringify(data.user));
    delete storedData.courses;
    delete storedData.progress;

    dispatch({
      type: userActionTypes.SET_USER,
      payload: data,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(storedData));
  } catch (error) {
    let err = error?.response?.data?.error;
    console.log(err);

    dispatch({
      type: userActionTypes.SET_ERR,
      payload: err,
    });
  }
  setTimeout(() => {
    dispatch({
      type: userActionTypes.RESET_FLAGS,
      payload: "",
    });
  }, 2000);
};

export const getAllUsers = () => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.user.token}`,
    },
  };
  try {
    const { data } = await axios.get(
      endPoints.BASE_URL + endPoints.USERS,
      config
    );

    dispatch({
      type: userActionTypes.GET_ALL_USERS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const changeUserRole = (id) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.user.token}`,
    },
  };
  dispatch({
    type: userActionTypes.SET_LOAD_REQ,
    payload: "",
  });
  try {
    await axios.put(
      endPoints.BASE_URL + endPoints.USERS + `/toggleLearner/${id}`,
      {},
      config
    );
    dispatch(getAllUsers());
  } catch (error) {
    console.log("-----------");
    console.log(error.response);
  }
};
