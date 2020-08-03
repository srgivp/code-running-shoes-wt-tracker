import { combineReducers } from "redux";
import shoesReducer from "./shoes-reducer";
import requestingData from "./requesting-data-reducer";
import loginReducer from "./login-reducer";
import usersReducer from "./users-reducer";
import initialLoginReducer from "./initial-login-reducer";
import currentUserReducer from "./current-user-reducer";

const rootReducer = combineReducers({
  users: usersReducer,
  requestingData: requestingData,
  //initialLogin: initialLoginReducer,
  currentUser: currentUserReducer
});
export default rootReducer;
