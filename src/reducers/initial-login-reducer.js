import { INITIAL_LOGIN } from "../actions/action-types";
const InitialLoginReducer = (
  state = { name: null, password: null },
  action
) => {
  switch (action.type) {
    case INITIAL_LOGIN:
      return action.data;
    default:
      return state;
  }
};

export default InitialLoginReducer;
