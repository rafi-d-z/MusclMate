//import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Exercise from '../src/Exercise';

describe('Exercise component', () => {
  test('renders without crashing', () => {
    render(<Exercise />);
  });

  test('deletes a card when delete button is clicked', () => {
    const { getByText } = render(<Exercise />);
    
    // Checks if card is initially rendered
    expect(screen.queryByText('push-ups') as HTMLElement).toBeTruthy();

    // Clicks delete button
    fireEvent.click(getByText('×'));
    
    // Checks if card is removed from the UI
    expect(screen.queryByText('push-ups')).toBeNull();

  });
});

