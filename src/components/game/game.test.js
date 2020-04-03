import React from 'react'
import { cleanup } from '@testing-library/react'
import Game from './index';
import { renderWithRedux } from '../reducers/util';

afterEach(cleanup)

it('should render with out crashing', () => {
  renderWithRedux(<Game />)
});

it('should take a snapshot of Game', () => {
  const { asFragment } = renderWithRedux(<Game />)

  expect(asFragment(<Game />)).toMatchSnapshot()
});
