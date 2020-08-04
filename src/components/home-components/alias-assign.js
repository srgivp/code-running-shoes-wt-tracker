import React from "react";
import "./home.scss";
import {
  setToRotation,
  requestingData,
  receivedData
} from "../../actions/setToRotation";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./login";
const basicLasting = 800;
let alias = null;
let model = null;
let lasting = basicLasting;

const receivingData = async (nickName, state) => {
  if (!state.currentUser.cookies || state.currentUser.cookies.length < 1) {
    alias = document.getElementById("alias").value;
    model = document.getElementById("model").value;
    lasting = document.getElementById("lasting").value;
    document.getElementById("login").style.display = "block";
    return;
  }
  let cookies;
  if (state.currentUser.cookies) {
    cookies = state.currentUser.cookies;
  } else {
    cookies = "no cookies";
  }
  let response = await fetch(
    `http://localhost:3000/initialCollecting?alias=${nickName}&cookies=${cookies}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  } else {
    response = await response.json();
    if (response.answer === "login") {
      alias = document.getElementById("alias").value;
      model = document.getElementById("model").value;
      lasting = document.getElementById("lasting").value;
      document.getElementById("login").style.display = "block";
      return;
    } else if (
      response.answer === "there is no pair with this alias in your rotation"
    ) {
      alert("there is no pair with this alias in your rotation");
      return;
    }
    {
      model = null;
      alias = null;
      lasting = basicLasting;
      let scrapedInfo = response;
      console.log(scrapedInfo);
      return scrapedInfo;
    }
  }
};

const AliasAssign = () => {
  const formShowUp = () => {
    document.getElementById("setting-to-rotation").style.display = "block";
  };
  const formShowOut = () => {
    document.getElementById("setting-to-rotation").style.display = "none";
  };
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const addPair = async alias => {
    dispatch(requestingData());
    const scrapedInfo = await receivingData(alias, state);
    if (!scrapedInfo) {
      dispatch(receivedData());
      //console.log(state.requestingData);
      return;
    } else {
      dispatch(setToRotation(scrapedInfo));
      dispatch(receivedData());
    }
    console.log(state.requestingData);
  };
  //do i need async below?
  /*const onLoginSubmit = () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("model").value = model;
    document.getElementById("alias").value = alias;
    document.getElementById("lasting").value = lasting;
  };*/
  return (
    <div>
      <div
        className="btn"
        onClick={() => {
          formShowUp();
        }}
      >
        add pair
      </div>
      <Login
        dispatch={dispatch}
        state={state}
        model={model}
        alias={alias}
        lasting={lasting} /*onClick={onLoginSubmit*/
      />
      <div id="setting-to-rotation">
        <form>
          <label>Shoe's alias</label>
          <input
            type="text"
            id="alias"
            name="alias"
            placeholder="alias from running app"
            title="Type in the nickname used in your running application"
            required
          />
          <label>Model</label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Type in model name"
            title="type in whole model name according to the example: hoka one one challenger atr 5"
            required
          />
          <label>Expected distance, km</label>
          <input
            type="text"
            id="lasting"
            name="lasting"
            title="Set forecasted distance in km to removal from the rotation"
            defaultValue={basicLasting}
            required
          />
        </form>
        <div
          className="btn"
          onClick={async () => {
            if (
              !document.getElementById("model").value ||
              !document.getElementById("alias").value ||
              !document.getElementById("lasting").value
            ) {
              alert("fill in all fields");
              return;
            }
            await addPair(document.getElementById("alias").value);
            document.getElementById("model").value = null;
            document.getElementById("alias").value = null;
            document.getElementById("lasting").value = basicLasting;
          }}
        >
          Set to the rotation
        </div>
        <div className="btn" onClick={formShowOut}>
          No more shoes to add
        </div>
      </div>
    </div>
  );
};

export default AliasAssign;
