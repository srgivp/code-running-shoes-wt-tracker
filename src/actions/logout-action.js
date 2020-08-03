import { LOGOUT } from "./action-types";

const logoutAction = data => {
  return {
    type: LOGOUT,
    data
  };
};

export default logoutAction;
