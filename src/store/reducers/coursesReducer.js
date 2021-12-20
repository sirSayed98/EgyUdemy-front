import * as coursesTypes from "../constants/coursesTypes";

const initialState = {
  availableCourses: [],
  availableCoursesCount: 0,
  singleCourse: {},
  success: false,
  err: null,
};

const createCourse = (data) => {
  let courses = [];

  data.forEach((course) => {
    let obj = {};
    obj.id = course._id;
    obj.title = course.title;
    obj.duration = course.weeks;
    obj.cost = course.tuition;
    obj.level = course.minimumSkill;
    obj.description = course.description;
    obj.instructor = course.instructor?.userName;
    courses.push(obj);
  });

  return courses;
};

export const coursesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case coursesTypes.GET_COURSES:
      const courses = createCourse(payload.data);

      return {
        ...state,
        availableCourses: courses,
        availableCoursesCount: payload.count,
      };
    case coursesTypes.GET_SINGLE_COURSES:
      const course = payload.data;
      return {
        ...state,
        singleCourse: course,
      };
    case coursesTypes.RESET_FLAGS:
      return {
        ...state,
        success: false,
        err: null,
      };
    case coursesTypes.COURSE_SUCESS:
      return {
        ...state,
        success: true,
      };
    case coursesTypes.COURSE_FAIL:
      return {
        ...state,
        err: payload,
      };

    default:
      return state;
  }
};
