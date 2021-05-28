import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

it('should render the input element', () => {
  const { getByLabelText } = render(<Home />);
  const input = getByLabelText('Type Your Token');

  expect(input).toBeDefined();
  expect(input.value).toHaveLength(0);

  fireEvent.change(input, { target: { value: 'tree' } });
  expect(input.value).toHaveLength(4);
});

it('should render the button element', () => {
  const onSubmit = jest.fn();
  const { getByText, getByTestId } = render(<Home onSubmit={onSubmit} />);
  const button = getByText('Search');
  const input = getByTestId('input');

  //   const button2 = render(<button type="submit">Search</button>);

  //   console.log(handleSubmit);

  //   expect(button).toBeDefined();

  fireEvent.change(input, { target: { value: 'deify mikey good' } });
  fireEvent.click(button);

  expect(onSubmit).toHaveBeenCalled();
});
