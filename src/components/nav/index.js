import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const NavContainer = styled.div`
  background: #F5F6F3;
  border-bottom-color: #40425D;
  border-bottom-width: 2;
  border-bottom-style: solid;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const NavText = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  margin: 0 auto;
  color: black;
`;

const Nav = () => {
  const { p1w, p2w, p1l, p2l, draws } = useSelector(state => state.GameState.scoreboard);

  return (
    <NavContainer>
      <NavText>
        {`P1: ${p1w} W - ${p1l} L`}
      </NavText>
      <NavText>
        {`P2: ${p2w} W - ${p2l} L`}
      </NavText>
      <NavText>
        {`Draws: ${draws}`}
      </NavText>
    </NavContainer>
  )
}

export default Nav;