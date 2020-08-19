import { INITIAL_LOGIN, LOGOUT, DELETE_ACCOUNT } from "../actions/action-types";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LOGOUT:
      {
        return [...JSON.parse(JSON.stringify(state)), action.data];
      }
      break;
    case INITIAL_LOGIN:
    case DELETE_ACCOUNT: {
      const stateOnStart = [...JSON.parse(JSON.stringify(state))];
      const newState = stateOnStart.filter(item => {
        return item.name !== action.data.name;
      });
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;
