import React, { useEffect } from 'react';
import Nav from './components/nav';
import Game from './components/game';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "LOAD" });
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Game />
    </>
  );
}

export default App;
