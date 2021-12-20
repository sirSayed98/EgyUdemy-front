import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SingleCourse from "./pages/SingleCourse/SingleCourse";
import AddCourse from "./pages/AddCourse/AddCourse";
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
            <Route exact path="/add-course" component={AddCourse} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
