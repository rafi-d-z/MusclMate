import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Exercise from '../src/Exercise';

test('adds a new exercise when submit button is clicked', async () => {
  // Render the Exercise component
  render(<Exercise />);

  // Input fields for adding a new exercise
  const exerciseNameInput = screen.getByPlaceholderText('Search');
  const addButton = screen.getByText('+');

  // Simulate typing into the input fields
  fireEvent.change(exerciseNameInput, { target: { value: 'New Exercise' } });

  // Click the add button to submit the new exercise
  fireEvent.click(addButton);

  // Wait for the new exercise to be added (you may need to adjust the timing)
  await waitFor(() => {
    expect(screen.queryByText('New Exercise')).toBeTruthy();
  });
});
