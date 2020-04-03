import { initialState } from '../reducers/Game/constants';
import { updateBoardState, updateGameHistory, updateScoreBoard, postMove } from '.';
import '@testing-library/jest-dom/extend-expect';

describe('Tests the api functions for gamebplay', () => {
  let state = Object.assign(initialState);

  beforeEach(() => {
    state = Object.assign(initialState);
  })


  it('test board state updates given a move and player turn', () => {
    const { boardState } = state;
    let newBoardState = updateBoardState(boardState, 0, 1, 1);
    newBoardState = updateBoardState(newBoardState, 1, 2, 2);
    newBoardState = updateBoardState(newBoardState, 0, 0, 1);
    newBoardState = updateBoardState(newBoardState, 1, 1, 2);
    expect(newBoardState[1][1]).toEqual("0");
    expect(newBoardState[2][2]).toEqual("X");
    expect(newBoardState[0][1]).toEqual("0");
    expect(newBoardState[1][2]).toEqual("X");
  });

  it('test gamehistory updates given a new move', () => {
    const { gameHistory } = state;
    let newGameHistory = updateGameHistory(gameHistory, 1, 1);
    expect(newGameHistory.hasEnded).toEqual(false);
    expect(newGameHistory.playerturn).toEqual(1);
    expect(newGameHistory.row[0][0]).toEqual(0);
    expect(newGameHistory.row[0][1]).toEqual(1);
    expect(newGameHistory.col[0][1]).toEqual(1);
    expect(newGameHistory.diag[0]).toEqual(1);
    expect(newGameHistory.antidiag[0]).toEqual(1);
  });

  it('test scoreboard updates given a game history', () => {
    const { gameHistory, scoreboard } = state;

    /* 
      P1 has won
    */
    gameHistory.hasEnded = true;
    gameHistory.winner = 0;

    let newScoreboard = updateScoreBoard(scoreboard, gameHistory);
    expect(newScoreboard.p1w).toEqual(1);
    expect(newScoreboard.p2l).toEqual(1);

    /* 
      P2 has won
    */
    gameHistory.hasEnded = true;
    gameHistory.winner = 1;

    newScoreboard = updateScoreBoard(newScoreboard, gameHistory);
    expect(newScoreboard.p1w).toEqual(1);
    expect(newScoreboard.p2w).toEqual(1);
    expect(newScoreboard.p2l).toEqual(1);
    expect(newScoreboard.p1l).toEqual(1);


    /* 
      Draw
    */
    gameHistory.hasEnded = true;
    gameHistory.winner = -1;
    newScoreboard = updateScoreBoard(newScoreboard, gameHistory);
    expect(newScoreboard.draws).toEqual(1);

  });

  it('make move triggers update to board, game history, scoreboard', () => {
    let updatedState = postMove(state, { payload: { i: 0, j: 0 } });
    const { gameHistory, boardState } = updatedState;
    expect(boardState[0][0]).toEqual("0");
    expect(gameHistory.row[0][0]).toEqual(1);

    updatedState = postMove(updatedState, { payload: { i: 0, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 1, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 2 } });
    const { scoreboard } = updatedState;

    expect(scoreboard.p1w).toEqual(1);
    expect(scoreboard.p2l).toEqual(1);

  });

  it('p1 wins', () => {
    let updatedState = postMove(state, { payload: { i: 0, j: 0 } });

    updatedState = postMove(updatedState, { payload: { i: 0, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 1, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 2 } });
    const { scoreboard } = updatedState;

    expect(scoreboard.p1w).toEqual(1);
    expect(scoreboard.p2l).toEqual(1);
  });

  it('p2 wins', () => {
    let updatedState = postMove(state, { payload: { i: 0, j: 1 } });

    updatedState = postMove(updatedState, { payload: { i: 0, j: 0 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 1, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 0 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 2 } });

    const { scoreboard } = updatedState;

    expect(scoreboard.p2w).toEqual(1);
    expect(scoreboard.p1l).toEqual(1);
  });

  it('a draw', () => {
    let updatedState = postMove(state, { payload: { i: 0, j: 0 } });

    updatedState = postMove(updatedState, { payload: { i: 0, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 1, j: 0 } });
    updatedState = postMove(updatedState, { payload: { i: 1, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 1 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 0 } });
    updatedState = postMove(updatedState, { payload: { i: 0, j: 2 } });
    updatedState = postMove(updatedState, { payload: { i: 1, j: 2 } });
    updatedState = postMove(updatedState, { payload: { i: 2, j: 2 } });

    const { scoreboard } = updatedState;

    expect(scoreboard.draws).toEqual(1);
  });

})
