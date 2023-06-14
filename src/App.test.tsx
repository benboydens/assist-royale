import React from 'react';
import { render, screen } from '@testing-library/react';
import Deck from './App';

test('renders learn react link', () => {
  render(<Deck />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
