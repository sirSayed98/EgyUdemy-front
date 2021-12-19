import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { coursesReducer } from "./reducers/coursesReducer";
import { userReducer } from "./reducers/userReducer";
const reducer = combineReducers({
  courses: coursesReducer,
  user: userReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
