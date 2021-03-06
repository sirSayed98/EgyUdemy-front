import * as userTypes from "../constants/userTypes";

const initialState = {
  user: null,
  success: null,
  fail: null,
  err: null,
  loadDone: false,
  usersTable: [],
  loadReq: false,
  redirect: null,
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
        success: null,
        fail: null,
        err: null,
        redirect: null,
      };
    case userTypes.LOAD_USER:
      let localUser = JSON.parse(localStorage.getItem("user"));

      if (localUser) {
        let localToken = localStorage.getItem("token");
        localUser.token = localToken;
        return {
          ...state,
          user: localUser,
          loadDone: true,
        };
      } else {
        return { ...initialState, loadDone: true };
      }
    case userTypes.GET_ALL_USERS:
      return {
        ...state,
        usersTable: payload,
        loadReq: false,
      };
    case userTypes.REDIRECT:
      return {
        ...state,
        redirect: true,
      };

    case userTypes.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...initialState, loadDone: true };

    case userTypes.SET_LOAD_REQ:
      return {
        ...state,
        loadReq: true,
      };
    default:
      return state;
  }
};
