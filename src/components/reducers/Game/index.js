
import { loadState } from '../../localstorage';
import { initialState, resetGameState } from './constants';
import { postMove } from '../../api';

/* 
  To mock API call I needed to do actions MOVE_REQUEST, MOVE_SUCCESS, MOVE_FAILED 
  In the interest of scope and time I just made a function call postMove

*/
const GameState = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD':
      const appState = loadState();
      return appState ? appState : initialState;
    case 'MOVE':
      if (state.gameHistory.hasEnded) return state;
      else return postMove(state, action)
    case 'RESET':
      return {
        ...state,
        ...resetGameState
      };
    default:
      return state;
  }
}

export default GameState;