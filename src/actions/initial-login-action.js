import { INITIAL_LOGIN } from "./action-types";
const initialLoginAction = data => {
  return { type: INITIAL_LOGIN, data };
};

export default initialLoginAction;
