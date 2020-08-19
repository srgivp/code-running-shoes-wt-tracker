import {
  SET_TO_ROTATION,
  DELETE_ITEM,
  RETIRE,
  PUT_BACK,
  ACTUALIZE
} from "../actions/action-types";
const shoesReducer = (basicState = [], action) => {
  const state = JSON.parse(JSON.stringify(basicState));
  switch (action.type) {
    case SET_TO_ROTATION:
      let model;
      for (let item of state) {
        if (item.alias === action.data.alias) {
          model = item.model;
          alert(
            `pair with this alias is already in rotation (model: ${model}). If you want to set other data to this pair, you should delete existing item first`
          );
          return state;
        }
      }

      return [...state, action.data];

    case DELETE_ITEM:
      let itemIndex;
      for (let item of state) {
        if (item.alias === action.data) {
          itemIndex = state.indexOf(item);
        }
      }
      const existingState = [...state];
      const actualState = existingState.filter(
        (item, index) => index !== itemIndex
      );
      return actualState;

    case RETIRE:
      let retiredPair;
      let initialState = [...state];
      for (let item of initialState) {
        if (item.alias === action.data.alias) {
          retiredPair = { ...item };
          retiredPair = { ...retiredPair, ...action.data };
          initialState.splice(initialState.indexOf(item), 1, retiredPair);
          return initialState;
        }
      }
      break;
    case PUT_BACK:
      let initState = [...state];
      let returningPair;
      for (let item of initState) {
        if (item.alias === action.data.alias) {
          returningPair = { ...item };
          returningPair.retired = "false";
          initState.splice(initState.indexOf(item), 1, returningPair);
          return initState;
        }
      }
      break;

    case ACTUALIZE:
      let actualizedState = [...JSON.parse(JSON.stringify(state))];
      let actualizingPair;
      for (let item of actualizedState) {
        if (item.alias === action.data.alias) {
          actualizingPair = { ...item };
          actualizingPair.actualMileage = action.data.actualMileage;
          actualizingPair.latestRunningDate = action.data.latestRunningDate;
          actualizingPair.latestMoveDate = action.data.latestMoveDate;
          actualizedState.splice(
            actualizedState.indexOf(item),
            1,
            actualizingPair
          );
          return actualizedState;
        }
      }
      break;

    default:
      return state;
  }
};
export default shoesReducer;
