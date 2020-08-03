import { CREATE_ACCOUNT } from "./action-types";

const createAccountAction = data => {
  return { type: CREATE_ACCOUNT, data };
};

export default createAccountAction;
