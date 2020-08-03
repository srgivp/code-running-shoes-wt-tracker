import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { onClickLogout } from "./logout";

const DeleteAccountBtn = () => {
  const originalState = useSelector(state => state);
  const state = JSON.parse(JSON.stringify(originalState));
  const dispatch = useDispatch();
  const onClickDeleteAccount = () => {
    if (state.currentUser.name) {
      onClickLogout(state, dispatch);
    }
    document.getElementById("initial-login").style.display = "block";
    //sign in btn
    document.querySelector(
      "#initial-login > form > input[type=submit]:nth-child(3)"
    ).style.display = "none";
    //create btn
    document.querySelector(
      "#initial-login > form > input[type=submit]:nth-child(4)"
    ).style.display = "none";
    //login text
    document.querySelector("#initial-login > div:nth-child(1)").style.display =
      "none";
    //delete text
    document.querySelector("#initial-login > div:nth-child(2)").style.display =
      "block";
    document.getElementById("delete-account-button").style.display =
      "inline-block";
    document.getElementById("back-btn").style.display = "inline-block";
  };

  return (
    <div /*className="btn"*/ onClick={onClickDeleteAccount}>Delete account</div>
  );
};

export default DeleteAccountBtn;
