import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SingleCourse from "./pages/SingleCourse/SingleCourse";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "LOAD_USER",
      payload: {},
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/course/:id" component={SingleCourse} />
      </Switch>
    </Router>
  );
};

export default App;
