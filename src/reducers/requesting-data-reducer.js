import { REQUESTING_DATA, RECEIVED_DATA } from "../actions/action-types";
const requestingData = (state = false, action) => {
  console.log("State from other reducer", state);
  switch (action.type) {
    case REQUESTING_DATA:
      return true;
      break;
    case RECEIVED_DATA:
      return false;
      break;
    default:
      return state;
  }
};
export default requestingData;
