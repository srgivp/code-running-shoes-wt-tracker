import { INITIAL_LOGIN, LOGOUT, DELETE_ACCOUNT } from "../actions/action-types";

const initialState = []; /*{
  shoes: [],
  login: { email: "", password: "", link: "http://www.movescount.com/" }
};*/

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      {
        //let stateOnStart = Object.assign([], state);
        return [...JSON.parse(JSON.stringify(state)), action.data];
      }
      break;
    case INITIAL_LOGIN:
    case DELETE_ACCOUNT: {
      const stateOnStart = [...JSON.parse(JSON.stringify(state))];
      console.log("stateOnStart", stateOnStart);
      const newState = stateOnStart.filter(item => {
        return item.name !== action.data.name;
      });
      console.log(newState);
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;
