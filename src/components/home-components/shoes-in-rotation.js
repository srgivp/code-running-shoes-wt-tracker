import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { setIntervalAsync } from "set-interval-async/dynamic";
//import { clearIntervalAsync } from "set-interval-async";
import deleteItem from "../../actions/delete-item";
import retireItemAction from "../../actions/retire-item-action";
import "./home.scss";
import { requestingData, receivedData } from "../../actions/setToRotation";
//import { actualizer } from "./actualizer";
import actualizeAction from "../../actions/actualize-action";

const Sneakers = props => {
  const [daysInRotation, setDaysInRotation] = useState(
    Math.floor((Date.now() - props.date) / 86400000)
  );
  setInterval(() => {
    console.log("daysInRotation", daysInRotation);
    setDaysInRotation(Math.floor((Date.now() - props.date) / 86400000));
  }, 86400000);
  const colorStyling = () => {
    const km = Math.floor(props.lasts - props.actualMileage);
    if (km < 0) {
      return "red";
    } else {
      return "initial";
    }
  };
  const titleOnDistanceExceeding = () => {
    const km = Math.floor(props.lasts - props.actualMileage);
    if (km < 0) {
      return "Maximum forecasted distance of this shoes is already exceeded";
    }
  };
  const daysToWriteOff = () => {
    const days = Math.floor(
      (daysInRotation / props.actualMileage) *
        (props.lasts - props.actualMileage)
    );
    if (days < 0) {
      return "exceeded";
    } else {
      return days;
    }
  };
  return (
    <div
      className="row grid-container rotation-grid-container"
      id={props.id}
      onClick={props.onClick}
    >
      <div className="col col-model">
        <p>{props.model}</p>
        <div className="row">
          <div className="btn delete-item">delete</div>
          <div className="btn retire">write off</div>
        </div>
      </div>
      <div className="col">{daysInRotation}</div>
      <div className="col">{props.actualMileage}</div>
      <div className="col" style={{ color: `${colorStyling()}` }}>
        {Math.floor(props.lasts - props.actualMileage)}
      </div>
      <div
        className="col"
        style={{ color: `${colorStyling()}` }}
        title={titleOnDistanceExceeding()}
      >
        {daysToWriteOff()}
      </div>
    </div>
  );
};

//brings info from outer app on distinct pair
export const receivingDataRetire = async (alias, state) => {
  let scrapedInfo;
  const cookies = state.currentUser.cookies;
  try {
    let response = await fetch(
      //`http://localhost:3000/initialCollecting?alias=${alias}&cookies=${cookies}`
      `https://running-shoes-tracker.herokuapp.com/initialCollecting?alias=${alias}&cookies=${cookies}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      response = await response.json();
      if (response.answer === "login") {
        document.getElementById("login-retire").style.display = "block";
        return;
      } else {
        scrapedInfo = response;
      }
    }
    return scrapedInfo;
  } catch (err) {
    alert("The error has ocurred: ", err);
    return;
  }
};

//grid of shoes in rotation
const ShoesRotating = () => {
  const dispatch = useDispatch();
  let state = useSelector(state => state);

  const onClickRetire = async (targetClass, targetId, state) => {
    let alias;
    if (targetClass === "btn retire") {
      alias = targetId;
      console.log(alias);

      dispatch(requestingData());
      try {
        const scrappedInfo = await receivingDataRetire(alias, state);
        if (!scrappedInfo) {
          dispatch(receivedData());
          return;
        } else {
          dispatch(retireItemAction(scrappedInfo, alias));
          dispatch(receivedData());
        }
      } catch (err) {
        alert("An error has ocurred");
        console.error("err caught:", err);
        dispatch(receivedData());
        return;
      }
    } else {
      return;
    }
  };
  if (state.currentUser.shoes.length > 0) {
    let sneakers = state.currentUser.shoes.map(item => {
      if (item.retired === "false") {
        return (
          <Sneakers
            key={item.alias}
            id={item.alias}
            model={item.model}
            actualMileage={item.actualMileage}
            lasts={item.lasts}
            onClick={async e => {
              const btnTargetClass = e.target.className;
              const btnCurrentTargetId = e.currentTarget.id;
              console.log(btnCurrentTargetId, btnTargetClass);
              await onClickRetire(btnTargetClass, btnCurrentTargetId, state);
              dispatch(deleteItem(btnTargetClass, btnCurrentTargetId));
            }}
            date={item.date}
          />
        );
      }
    });
    if (sneakers.length > 0) {
      return sneakers;
    } else {
      return "There is no shoes set to rotation";
    }
  } else {
    return "There is no shoes set to rotation yet";
  }
};
//delete it in separate file
//consolidates (through receivingDataRetire) info on all sneakers of currentUser
const actualizer = async (stateShoes, state) => {
  let scrapedInfo = [];
  for (let item of stateShoes) {
    let scrapedInfoElem = await receivingDataRetire(item.alias, state);
    if (!scrapedInfoElem) {
      return;
    } else {
      scrapedInfoElem.alias = item.alias;
      console.log("scrapedInfoElem", scrapedInfoElem);
      scrapedInfo.push(scrapedInfoElem);
      console.log("scrapedInfo from actualizer", scrapedInfo);
    }
  }
  return scrapedInfo;
};

const ShoesInRotation = () => {
  const dispatch = useDispatch();
  const basicState = useSelector(state => state);
  const state = JSON.parse(JSON.stringify(basicState));
  let stateShoes = [...state.currentUser.shoes];
  const actualizeData = async () => {
    dispatch(requestingData());
    try {
      const scrappedInfo = await actualizer(stateShoes, state);
      if (scrappedInfo.length > 0) {
        dispatch(receivedData());
        for (let item of scrappedInfo) {
          dispatch(actualizeAction(item, item.alias));
        }
        alert("Data is up to date");
      } else {
        dispatch(receivedData());
        return;
      }
    } catch (err) {
      alert("An error has ocurred");
      console.error("err caught:", err);
      dispatch(receivedData());
      return;
    }
  };
  return (
    <div id="shoes-grid" className="section-container">
      <div className="grid-caption">
        <h3>Already in your rotation</h3>
        <div
          className="btn"
          onClick={async () => {
            await actualizeData();
          }}
        >
          update
        </div>
      </div>
      <div className="row header grid-container rotation-grid-container">
        <div className="col">model</div>
        <div className="col">days in rotation</div>
        <div className="col">actual distance, km</div>
        <div className="col">km's to write-off</div>
        <div className="col">days to write-off</div>
      </div>
      <ShoesRotating />
    </div>
  );
};
export default ShoesInRotation;
