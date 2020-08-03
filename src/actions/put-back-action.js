import { PUT_BACK } from "./action-types";
const putBackAction = alias => {
  return {
    type: PUT_BACK,
    data: { alias: alias }
  };
};

export default putBackAction;
