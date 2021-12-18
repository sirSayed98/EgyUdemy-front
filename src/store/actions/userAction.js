/* eslint-disable no-unused-vars */
import * as userActionTypes from "../constants/userTypes";
import * as endPoints from "../constants/endPoints";
import axios from "axios";

export const login = (userName, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      endPoints.BASE_URL + endPoints.LOGIN,
      { userName, password },
      config
    );
    console.log(data);

    dispatch({});

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({});
  }
};
