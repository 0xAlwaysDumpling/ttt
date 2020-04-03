import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Square } from './index';

afterEach(cleanup)

it('should render with out crashing', () => {
  render(<Square />)
});


it('should take a snapshot of square', () => {
  const { asFragment } = render(<Square />)

  expect(asFragment(<Square />)).toMatchSnapshot()
});
