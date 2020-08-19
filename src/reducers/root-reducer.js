import { combineReducers } from "redux";
import requestingData from "./requesting-data-reducer";
import usersReducer from "./users-reducer";
import currentUserReducer from "./current-user-reducer";

const rootReducer = combineReducers({
  users: usersReducer,
  requestingData: requestingData,
  currentUser: currentUserReducer
});
export default rootReducer;
