import { ACTUALIZE } from "./action-types";
import { type } from "os";
const actualizeAction = (data, alias) => {
  return {
    type: ACTUALIZE,
    data: {
      alias: alias,
      actualMileage: data.mileage.split(" ")[0]
    }
  };
};
export default actualizeAction;
