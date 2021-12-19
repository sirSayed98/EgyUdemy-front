import * as userTypes from "../constants/userTypes";

const initialState = {
  user: null,
  success: null,
  fail: null,
  err: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.SET_USER:
      const { user, token } = payload;
      user.token = token;
      return {
        ...state,
        user,
        success: true,
      };
    case userTypes.SET_ERR:
      return {
        ...state,
        err: payload,
      };
    case userTypes.RESET_FLAGS:
      return {
        ...state,
        sucess: null,
        fail: null,
        err: null,
      };
    case userTypes.LOAD_USER:
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        return {
          ...state,
          user: localUser,
        };
      } else {
        return initialState;
      }
    case userTypes.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return initialState;
    default:
      return state;
  }
};
