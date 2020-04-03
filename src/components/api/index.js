
import { boardSize } from '../reducers/Game/constants';
/* 
  Supopse to mock rest or graphql call here.
  If you store all of the board state, score, and history on the server you can just send it the coords
  Typically you would do a dispatch MOVE_REQUEST and make an async rest call before dispatching a MOVE_SUCCESS and updating redux store
  If this was graphql you can run a mutation but I would just use subscriptions for real time updates.

  I ended up just doing a function call and coupled it with my redux updates for simplicity. 
  There's no thunk nor sagas so had to chain them.
*/
export const postMove = (state, action) => {
  const { payload: { i, j } } = action;
  const { boardState, gameHistory, scoreboard } = state;

  const newBoardState = updateBoardState(boardState, gameHistory.playerturn, i, j);
  const newGameHistory = updateGameHistory(gameHistory, i, j);
  const newScoreboard = updateScoreBoard(scoreboard, newGameHistory);
  return {
    ...state,
    boardState: newBoardState,
    scoreboard: newScoreboard,
    gameHistory: newGameHistory
  }
}


export const updateBoardState = (boardState, turn, i, j) => {
  const valToPlace = turn === 1 ? "X" : "0";
  return Object.assign([...boardState], {
    [i]: Object.assign([...boardState[i]], {
      [j]: valToPlace
    })
  });
}

export const updateGameHistory = (gameHistory, i, j) => {
  const updatedGameHistory = JSON.parse(JSON.stringify(gameHistory));
  const { playerturn, row, col, diag, antidiag } = updatedGameHistory;

  // Check if there is a winner
  row[playerturn][i]++;
  col[playerturn][j]++;
  if (i === j) diag[playerturn]++;
  if (i + j + 1 === boardSize) antidiag[playerturn]++;
  updatedGameHistory.hasEnded = (row[playerturn][i] === boardSize || col[playerturn][j] === boardSize || diag[playerturn] === boardSize || antidiag[playerturn] === boardSize);
  if (updatedGameHistory.hasEnded) updatedGameHistory.winner = playerturn;

  // Check if there is a draw
  if (!updatedGameHistory.hasEnded) updatedGameHistory.hasEnded = (row[0][0] + row[1][0] === boardSize &&
    row[0][1] + row[1][1] === boardSize &&
    row[0][2] + row[1][2] === boardSize &&
    col[0][0] + col[1][0] === boardSize &&
    col[0][1] + col[1][1] === boardSize &&
    col[0][2] + col[1][2] === boardSize);

  updatedGameHistory.playerturn = playerturn === 1 ? 0 : 1;

  return updatedGameHistory;
}

export const updateScoreBoard = (scoreboard, gameHistory) => {
  const updatedScoreboard = JSON.parse(JSON.stringify(scoreboard));

  if (gameHistory.hasEnded) {
    if (gameHistory.winner === 1) {
      updatedScoreboard.p2w++;
      updatedScoreboard.p1l++;
    }
    else if (gameHistory.winner === 0) {
      updatedScoreboard.p1w++;
      updatedScoreboard.p2l++;
    }
    else if (gameHistory.winner === -1) updatedScoreboard.draws++;
  }
  return {
    ...scoreboard,
    ...updatedScoreboard
  }
}