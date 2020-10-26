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
    cookies = cookies.replace(/%22/g, "\\%22");
  } else {
    cookies = "no cookies";
  }
  let response = await fetch(
    `${process.env.SERVER_URL}/initialCollecting?alias=${nickName}&cookies=${cookies}`
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
    } else if (response.answer === "error") {
      console.log("error:", response.errorMessage, "error name:", err.name);
      alert("error, look console for details");
      return;
    } else if (response.answer === "can't load") {
      console.log("error:", response.errorMessage, "error name:", err.name);
      alert(
        "Can't load the session in the browser. Probably you're not logged in to your outer running app and your internet speed is to low. See console for details"
      );
      return;
    }
    {
      model = null;
      alias = null;
      lasting = basicLasting;
      let scrapedInfo = response;
      //console.log(scrapedInfo);
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
    let scrapedInfo;
    try {
      scrapedInfo = await receivingData(alias, state, dispatch);
    } catch (err) {
      alert("Error while fetching from server");
      console.log("error:", err.name, err.message);
      dispatch(receivedData);
    }
    if (!scrapedInfo) {
      dispatch(receivedData());
      return;
    } else {
      dispatch(setToRotation(scrapedInfo));
      dispatch(receivedData());
    }
  };
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
        lasting={lasting}
      />
      <div id="setting-to-rotation">
        <form>
          <div className="labelInputContainer">
            <label>Shoes' alias</label>
            <input
              type="text"
              id="alias"
              name="alias"
              placeholder="alias from running app"
              title="Type in the nickname used in your running application"
              required
            />
          </div>
          <div className="labelInputContainer">
            <label>Model</label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="type in model name"
              title="type in whole model name according to the example: hoka one one challenger atr 5"
              required
            />
          </div>
          <div className="labelInputContainer">
            <label>Expected distance, km</label>
            <input
              type="text"
              id="lasting"
              name="lasting"
              title="Set forecasted distance in km to removal from the rotation"
              defaultValue={basicLasting}
              required
            />
          </div>
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
