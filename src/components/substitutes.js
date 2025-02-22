import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Substitutes = () => {
  const state = useSelector(state => state);
  useEffect(() => {
    if (!state.currentUser.name) {
      document.querySelector(".main-info-container").style.display = "none";
      document.querySelector("header>ul").style.display = "none";
    } else {
      document.querySelector(".main-info-container").style.display = "block";
      document.querySelector("#initial-login").style.display = "none";
      document.querySelector("header>ul").style.display = "block";
    }
  }, [state.currentUser.name]);
  return (
    <div className="main-info-container">substitutos se aparecen aqui</div>
  );
};
export default Substitutes;
