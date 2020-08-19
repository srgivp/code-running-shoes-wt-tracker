import {
  SET_TO_ROTATION,
  REQUESTING_DATA,
  RECEIVED_DATA,
  LOGIN
} from "./action-types";
//import { initialInfoCollecting } from "../puppeteer-stuff/initial-info-collecting";
//const puppeteer = require("puppeteer");
//let actualMileage;
export const requestingData = () => {
  return {
    type: REQUESTING_DATA
  };
};
export const receivedData = () => {
  return {
    type: RECEIVED_DATA
  };
};
export const loginAction = data => {
  return {
    type: LOGIN,
    data: data
  };
};
export const reversedDate = incomingDate => {
  return incomingDate.split(".").reverse().join(".");
};
export const setToRotation = scrapedInfo => {
  const mileageString = scrapedInfo.mileage;
  const mileageArray = mileageString.split(" ");
  const actualMileage = mileageArray[0];

  const model = document.getElementById("model").value;
  const alias = document.getElementById("alias").value;
  const lasts = document.getElementById("lasting").value;
  const date = Date.parse(reversedDate(scrapedInfo.startingDate));
  const latestRunningDate = Date.parse(reversedDate(scrapedInfo.latestDate));
  const latestMoveDate = Date.parse(reversedDate(scrapedInfo.latestMoveDate));
  return {
    type: SET_TO_ROTATION,
    data: {
      alias: `${alias}`,
      model: `${model}`,
      lasts: `${lasts}`,
      date: `${date}`,
      latestRunningDate: `${latestRunningDate}`,
      latestMoveDate: `${latestMoveDate}`,
      actualMileage: `${actualMileage}`,
      retired: "false"
    }
  };
};
