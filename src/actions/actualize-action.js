import { ACTUALIZE } from "./action-types";
import { reversedDate } from "./setToRotation";
const actualizeAction = (data, alias) => {
  return {
    type: ACTUALIZE,
    data: {
      alias: alias,
      actualMileage: data.mileage.split(" ")[0],
      latestRunningDate: Date.parse(reversedDate(data.latestDate)),
      latestMoveDate: Date.parse(reversedDate(data.latestMoveDate))
    }
  };
};
export default actualizeAction;
