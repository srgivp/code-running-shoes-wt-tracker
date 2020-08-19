import { RETIRE } from "./action-types";
const retireItemAction = (scrapedInfo, alias) => {
  const retirementDate = /*Date.parse reversedDate*/ scrapedInfo.latestDate;
  const distanceOnRetirement = scrapedInfo.mileage;
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
