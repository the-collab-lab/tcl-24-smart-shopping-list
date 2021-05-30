import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

it('should render the input element', () => {
  const { getByTestId } = render(<Home />);
  const input = getByTestId('input');

  expect(input).toBeDefined();
  expect(input.value).toHaveLength(0);

  fireEvent.change(input, { target: { value: 'tree' } });
  expect(input.value).toHaveLength(4);
});

it('should render the main heading correctly', () => {
  const { getByRole } = render(<Home />);
  const h1 = getByRole('heading');

  expect(h1).toBeDefined();
  expect(h1).toHaveTextContent('Smart Shopping App');
});

it('should render the logo image correctly', () => {
  const { getByRole } = render(<Home />);
  const logo = getByRole('img');

  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('alt', 'store');
});

it('should render an add new list button that should work correctly', () => {
  const { getByTestId } = render(<Home />);
  const button = getByTestId('addList');

  expect(button).toBeDefined();
});
