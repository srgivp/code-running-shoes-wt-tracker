import { RETIRE } from "./action-types";
const retireItemAction = (scrapedInfo, alias) => {
  const retirementDate = /*Date.parse reversedDate*/ scrapedInfo.latestDate;
  const distanceOnRetirement = scrapedInfo.mileage;
  console.log("object from action", {
    type: RETIRE,
    data: {
      alias: `${alias}`,
      retirementDate: `${retirementDate}`,
      distanceOnRetirement: `${distanceOnRetirement}`,
      retired: "true"
    }
  });
  return {
    type: RETIRE,
    data: {
      alias: `${alias}`,
      retirementDate: `${retirementDate}`,
      distanceOnRetirement: `${distanceOnRetirement}`,
      retired: "true"
    }
  };
};

export default retireItemAction;
