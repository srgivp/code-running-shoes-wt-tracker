import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AliasAssign from "./home-components/alias-assign";
import ShoesInRotation from "./home-components/shoes-in-rotation";
import "./home-components/home.scss";
const Home = () => {
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
    <div id="rotation-page" className="main-info-container">
      <AliasAssign />
      <ShoesInRotation />
    </div>
  );
};

export default Home;
