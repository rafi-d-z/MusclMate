//import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Exercise from '../src/Exercise';

test('Popover opens when trigger is clicked and closes when closed button is clicked', () => {
  const { getByText, queryByText } = render(<Exercise />);
  
  // Check that the popover content is initially not rendered
  expect(queryByText('Edit Exercise')).toBeNull();

  // Click on the trigger to open the popover
  fireEvent.click(getByText('Edit'));

  // Check that the popover content is rendered
  expect(getByText('Edit Exercise')).toBeInTheDocument();

  // Click on the close button to close the popover
  fireEvent.click(getByText('Close'));

  // Check that the popover content is no longer rendered
  expect(queryByText('Edit Exercise')).toBeNull();
});
