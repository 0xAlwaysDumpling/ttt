import React, { useCallback } from 'react';
import { Board } from './board';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


const GameContainer = styled.div`
  padding: 5%;
`;

const RestartGameContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
`;

const RestartGameButton = styled.button`
  font-size: 2rem;
  align-self: center;
  border: 0;
  border-color: grey;
  border-width: 2px;
  border-style: solid;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  background: #F5F6F3;
  color: black;
`;

function Game() {
  const { boardState, gameHistory: { hasEnded } } = useSelector(state => state.GameState);

  const dispatch = useDispatch();

  const onMove = useCallback((i, j) => {
    dispatch({ type: "MOVE", payload: { i, j } });
  }, [dispatch]);

  const startNewGame = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);

  return (
    <GameContainer>
      <Board boardState={boardState} onMove={onMove} />
      {hasEnded && <RestartGameContainer><RestartGameButton onClick={startNewGame}>RESET</RestartGameButton></RestartGameContainer>}
    </GameContainer>
  )

}

export default Game;