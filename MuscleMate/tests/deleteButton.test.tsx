import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Exercise from '../src/Exercise';

describe('Exercise component', () => {
  test('renders without crashing', () => {
    render(<Exercise />);
  });

  test('deletes a card when delete button is clicked', async () => { // Make sure to mark the test as asynchronous
    const { getByText } = render(<Exercise />);
    
    // Checks if card is initially rendered
    expect(screen.queryByText('push-ups') as HTMLElement).toBeInTheDocument(); // Use a type assertion here

    // Clicks delete button
    fireEvent.click(getByText('X'));
    
    // Wait for the deletion to take effect
    await waitFor(() => {
      // Checks if card is removed from the UI
      expect(screen.queryByText('push-ups')).toBeNull();
    });
  });
});
