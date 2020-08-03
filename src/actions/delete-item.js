import { DELETE_ITEM } from "./action-types";
const deleteItem = (targetClass, targetId) => {
  let itemAlias;
  if (targetClass === "btn delete-item") {
    itemAlias = targetId;
    console.log("itemAlias", itemAlias);
    return {
      type: DELETE_ITEM,
      data: itemAlias
    };
  }
};
export default deleteItem;
