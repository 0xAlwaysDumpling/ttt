import { saveState } from "../localstorage";

function LocalStorageMiddleware({ getState }) {
  return next => action => {
    if (action.type === "MOVE" || action.type === "RESET") {
      const returnValue = next(action)
      saveState(getState().GameState);
      return returnValue;
    }
    return next(action);
  }
}

export default LocalStorageMiddleware;