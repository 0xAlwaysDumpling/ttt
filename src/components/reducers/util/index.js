import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import rootReducer from '../index';
import { initialState as GameInitialState } from '../Game/constants'

const initialState = {
  GameState: GameInitialState
}

export const renderWithRedux = (
  component,
) => {
  const store = createStore(rootReducer, initialState)
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
