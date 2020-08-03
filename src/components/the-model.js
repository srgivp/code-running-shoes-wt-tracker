import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Model = () => {
  const state = useSelector(state => state);
  useEffect(() => {
    if (!state.currentUser.name) {
      document.querySelector(".main-info-container").style.display = "none";
      //document.querySelector("#initial-login").style.display = "block";
      document.querySelector("header>ul").style.display = "none";
    } else {
      document.querySelector(".main-info-container").style.display = "block";
      document.querySelector("#initial-login").style.display = "none";
      document.querySelector("header>ul").style.display = "block";
    }
  }, [state.currentUser.name]);
  return (
    <div className="main-info-container">
      El modelo distinto va a aparecer aqui
    </div>
  );
};
export default Model;
