/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";

import "./Home.css";
import CustomCard from "../../components/Card/Card";
import { getALLCourses } from "./../../store/actions/coursesAction";

const Home = () => {
  const dispatch = useDispatch();
  const { availableCourses, availableCoursesCount } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(getALLCourses());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="vh-100">
        <div className="px-3 mt-3">
          <span className="d-block text-center font-italic header-1 main-color">
            Learn To Earn
          </span>
          <span className="d-block text-center font-header slogan ">
            Skills for your present and your future
          </span>
        </div>

        <div>
          <span className="d-block my-4 mx-2 font-size-header font-header">
            Our Courses ({availableCoursesCount})
          </span>

          <div className="d-flex flex-wrap justify-content-around">
            {availableCourses.map((course) => {
              return <CustomCard data={course} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
