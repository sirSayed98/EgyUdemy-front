import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SingleCourse from "./pages/SingleCourse/SingleCourse";
import AddCourse from "./pages/AddCourse/AddCourse";
import CoursesTable from "./pages/CoursesTable/CoursesTable";
import EditCourse from "./pages/EditCourse/EditCourse";
import UsersTable from "./pages/UsersTable/UsersTable";
import EditSection from "./pages/EditSection/EditSection";

const App = () => {
  const dispatch = useDispatch();
  const { loadDone } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: "LOAD_USER",
      payload: {},
    });
  }, [dispatch]);

  return (
    <>
      {loadDone && (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/course/:id" component={SingleCourse} />
            <Route exact path="/edit-course/:id" component={EditCourse} />
            <Route exact path="/edit-section/:id" component={EditSection} />
            <Route exact path="/add-course" component={AddCourse} />
            <Route exact path="/courses" component={CoursesTable} />
            <Route exact path="/users" component={UsersTable} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
