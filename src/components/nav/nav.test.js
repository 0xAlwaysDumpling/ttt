import React from 'react'
import { cleanup } from '@testing-library/react'
import Nav from './index';
import { renderWithRedux } from '../reducers/util';

afterEach(cleanup)

it('should render with out crashing', () => {
  renderWithRedux(<Nav />)
});

it('should take a snapshot of Nav', () => {
  const { asFragment } = renderWithRedux(<Nav />)

  expect(asFragment(<Nav />)).toMatchSnapshot()
});
