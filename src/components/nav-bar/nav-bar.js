import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./nav-bar-style.scss";
import DeleteAccountBtn from "./delete-account-btn";
import Logout from "./logout";

const NavBar = () => {
  const state = useSelector(state => state);
  useEffect(() => {
    if (!state.currentUser.name) {
      //user btn
      document.getElementById("user-btn").style.display = "none";
      //start-btn
      document.getElementById("start-btn").style.display = "block";
    } else {
      document.getElementById("user-btn").style.display = "flex";
      document.getElementById("start-btn").style.display = "none";
    }
  }, [state.currentUser.name]);
  const onClickStart = display => {
    if (document.getElementById("initial-login").style.display !== "none") {
      document.getElementById("initial-login").style.display = "none";
    } else if (!state.currentUser.name) {
      document.getElementById("initial-login").style.display = display;
    }
  };
  const onClickUserMenu = () => {
    if (document.getElementById("user-menu").style.display !== "none") {
      document.getElementById("user-menu").style.display = "none";
    } else {
      document.getElementById("user-menu").style.display = "flex";
    }
  };
  return (
    <div id="nav-bar">
      <div
        id="start-btn"
        className="btn"
        onClick={() => {
          onClickStart("block");
        }}
      >
        Start
      </div>
      <div id="user-btn" className="circle-btn" onClick={onClickUserMenu}>
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
      <div id="user-menu" style={{ display: "none" }}>
        <DeleteAccountBtn />
        <Logout />
      </div>
    </div>
  );
};

export default NavBar;
