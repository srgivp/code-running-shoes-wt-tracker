import { COOKIES } from "./action-types";

const saveCookiesAction = data => {
  return { type: COOKIES, data };
};

export default saveCookiesAction;
