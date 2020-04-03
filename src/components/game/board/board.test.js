import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Board } from './index';
import { initialBoardState } from '../../reducers/Game/constants';

afterEach(cleanup)

const onMove = () => { };
it('should render with out crashing', () => {

  render(<Board boardState={initialBoardState} onMove={onMove} />)
});

it('should take a snapshot of board', () => {
  const { asFragment } = render(<Board boardState={initialBoardState} onMove={onMove} />)

  expect(asFragment(<Board boardState={initialBoardState} onMove={onMove} />)).toMatchSnapshot()
});
