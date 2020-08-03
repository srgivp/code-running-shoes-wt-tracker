import { LOGIN } from "../actions/action-types";
const initialState = {
  email: "",
  password: "",
  link: "http://www.movescount.com/"
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.data.email,
        password: action.data.password
      };
      break;
    default:
      return state;
  }
};

export default loginReducer;
