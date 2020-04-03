export const boardSize = 3;
export const initialBoardState = new Array(boardSize).fill(null).map(row => new Array(boardSize).fill(null));

export const initialScoreboard = {
  p1w: 0,
  p2w: 0,
  p1l: 0,
  p2l: 0,
  draws: 0
}

export const initalGameHistoryMapState = (new Array(boardSize).fill(0)).reduce((accum, _, index) => { accum[index] = 0; return accum; }, {});
export const initialGameHistory = {
  hasEnded: false,
  playerturn: 0,
  winner: -1,
  row: { 0: { ...initalGameHistoryMapState }, 1: { ...initalGameHistoryMapState } },
  col: { 0: { ...initalGameHistoryMapState }, 1: { ...initalGameHistoryMapState } },
  diag: { 0: 0, 1: 0 },
  antidiag: { 0: 0, 1: 0 },
}

export const initialState = {
  boardState: initialBoardState,
  gameHistory: initialGameHistory,
  scoreboard: initialScoreboard,
};

export const resetGameState = {
  boardState: initialBoardState,
  gameHistory: initialGameHistory
};
