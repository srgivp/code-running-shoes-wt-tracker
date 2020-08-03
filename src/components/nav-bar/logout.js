import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logoutAction from "../../actions/logout-action";

export const onClickLogout = (state, dispatch) => {
  const currentState = { ...state.currentUser };
  if (currentState.name) {
    dispatch(logoutAction(currentState));
    document.getElementById("user-menu").style.display = "none";
  } else {
    alert("Nobody's signed in");
  }
};
const Logout = () => {
  const originalState = useSelector(state => state);
  const state = JSON.parse(JSON.stringify(originalState));
  const dispatch = useDispatch();
  return (
    <div
      //className="btn"
      onClick={() => {
        onClickLogout(state, dispatch);
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
