import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root-reducer";
import { loadState, saveState } from "./local-storage";
import thunk from "redux-thunk";
const initialState = loadState();
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
