import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSingleCourse } from "../../store/actions/coursesAction";
const SingleCourse = ({ match }) => {
  const dispatch = useDispatch();
  const { singleCourse } = useSelector((state) => state.courses);
  console.log(singleCourse);

  useEffect(() => {
    let id = match?.params?.id;
    if (id) dispatch(getSingleCourse(id));
  }, [match, dispatch]);

  return <>{match?.params.id}</>;
};

export default SingleCourse;
