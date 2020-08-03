import { INITIAL_LOGIN } from "../actions/action-types";
import initialLoginAction from "../actions/initial-login-action";
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
