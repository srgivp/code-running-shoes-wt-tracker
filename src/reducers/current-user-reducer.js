import {
  SET_TO_ROTATION,
  DELETE_ITEM,
  RETIRE,
  PUT_BACK,
  ACTUALIZE,
  LOGIN,
  LOGOUT,
  CREATE_ACCOUNT,
  INITIAL_LOGIN,
  COOKIES
} from "../actions/action-types";
import shoesReducer from "./shoes-reducer";
import loginReducer from "./login-reducer";

const basicUserState = {
  shoes: [],
  login: { email: "", password: "", link: "http://www.movescount.com/" }
};
const currentUserReducer = (state = basicUserState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      {
        return Object.assign(
          {},
          JSON.parse(JSON.stringify(state)),
          action.data
        );
      }
      break;
    case SET_TO_ROTATION:
    case DELETE_ITEM:
    case RETIRE:
    case PUT_BACK:
    case ACTUALIZE:
      {
        return Object.assign({}, JSON.parse(JSON.stringify(state)), {
          shoes: shoesReducer(state.shoes, action)
        });
      }
      break;
    case LOGIN:
      return Object.assign({}, JSON.parse(JSON.stringify(state)), {
        login: loginReducer(state.login, action)
      });
      break;
    case LOGOUT:
      return {
        shoes: [],
        login: { email: "", password: "", link: "http://www.movescount.com/" }
      };
    case INITIAL_LOGIN:
      return action.data;
      break;
    case COOKIES: {
      let initialState = JSON.parse(JSON.stringify(state));
      initialState.cookies = action.data;
      return initialState;
    }
    default:
      return state;
  }
};

export default currentUserReducer;
