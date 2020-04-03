import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 100%;
  width: 100%;
  min-height: 200px;
  background: transparent;
  border: 0;
  font-size: 5rem;
  color: black;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  max-width: 1000px;
  margin: 0 auto;
  background: #F5F6F3;
  border-radius: 16px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
`;

const BoardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  &:not(:last-child) {
    border-bottom-width: 2px;
    border-bottom-style: solid; 
    border-bottom-color: grey;
  }
  `;

const SquareContainer = styled.div`
  &:first-child {
    border-right-width: 2px;
    border-right-style: solid; 
    border-right-color: grey;
  }
  &:last-child {
    border-left-width: 2px;
    border-left-style: solid; 
    border-left-color: grey;
  }
`;


export const Square = ({ onMove, value }) => {
  return (
    <SquareContainer>
      <Button disabled={value ? true : false} onClick={onMove}>{value}</Button>
    </SquareContainer>
  );
}

export const Board = ({ boardState, onMove }) => {
  return (
    <BoardContainer>
      {
        boardState.map((boardRow, boardRowIndex) =>
          <BoardRow key={`boardRow_${boardRowIndex}`}>
            {
              boardRow.map((row, squareIndex) =>
                <Square
                  key={`square_${squareIndex}_${boardRowIndex}`}
                  onMove={onMove.bind(null, boardRowIndex, squareIndex)}
                  value={boardState[boardRowIndex][squareIndex]}
                />
              )
            }
          </BoardRow>
        )
      }
    </BoardContainer>
  )
}

