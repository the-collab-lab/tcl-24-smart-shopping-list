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

  const handleClick = jest.fn();

  expect(button).toBeDefined();
  //   console.log(button);
  //   expect(button).toHaveAttribute('onClick', handleClick);
});

// it('should render the button element', () => {
//   const onSubmit = jest.fn();
//   const { getByText, getByTestId } = render(<Home onSubmit={onSubmit} />);
//   const button = getByText('Search');
//   const input = getByTestId('input');

//   //   const button2 = render(<button type="submit">Search</button>);

//   //   console.log(handleSubmit);

//   //   expect(button).toBeDefined();

//   fireEvent.change(input, { target: { value: 'deify mikey good' } });
//   fireEvent.click(button);

//   expect(onSubmit).toHaveBeenCalled();
// });
