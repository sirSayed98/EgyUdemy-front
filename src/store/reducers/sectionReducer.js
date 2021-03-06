import * as sectionTypes from "../constants/sectionsTypes";

const initialState = {
  load: false,
  success: false,
  err: null,
  singleSection: {},
};

export const sectionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case sectionTypes.GET_SINGLE_SECTION:
      return {
        ...state,
        singleSection: payload,
      };

    case sectionTypes.RESET_FLAGS_SECTION:
      return {
        ...state,
        success: false,
        err: null,
        load: false,
      };
    case sectionTypes.ADD_SECTION_SUCESS:
      return {
        ...state,
        success: true,
        load: false,
      };
    case sectionTypes.ADD_SECTION_FAIL:
      return {
        ...state,
        err: payload,
        load: false,
      };

    case sectionTypes.SET_LOAD_SECTION:
      return {
        ...state,
        load: true,
      };
    case sectionTypes.EDIT_SECTION_SUCCESS:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};
