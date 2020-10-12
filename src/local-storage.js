export const loadState = () => {
  try {
    const storedState = localStorage.getItem("state");
    if (storedState === null) {
      return undefined;
    }
    return JSON.parse(storedState);
  } catch (err) {
    alert(
      "There is a problem with loading state from the storage, see console for details"
    );
    console.log("loading state from the storage:", err.name, err.message);
    return undefined;
  }
};
export const saveState = state => {
  try {
    const storedState = JSON.stringify(state);
    localStorage.setItem("state", storedState);
  } catch (err) {
    alert(
      "There is a problem with saving state to the storage, see console for details"
    );
    console.log("saving state to the storage:", err.name, err.message);
  }
};
