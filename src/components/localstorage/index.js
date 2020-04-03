export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    let currState = loadState();
    currState = currState || {};
    localStorage.setItem("state", JSON.stringify({
      ...currState,
      ...state
    }));
  } catch (err) {
    // Ignore write errors, we just won't have a persisted state
  }
};
