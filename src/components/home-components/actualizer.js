import receivingDataRetire from "./shoes-in-rotation";
import actualizeAction from "../../actions/actualize-action";

export const actualizer = async state => {
  let scrapedInfo = [];
  for (let item of state) {
    let scrapedInfoElem = await receivingDataRetire(item.alias);
    scrapedInfoElem.alias = item.alias;
    scrapedInfo.push[scrapedInfoElem];
  }
  console.log("scrapedInfo from actualizer", scrapedInfo);
  return scrapedInfo;
};
