import { DELETE_ACCOUNT } from "./action-types";
const deleteAccountAction = data => {
  return { type: DELETE_ACCOUNT, data };
};

export default deleteAccountAction;
