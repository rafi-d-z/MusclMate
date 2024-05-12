import { render, fireEvent, screen } from '@testing-library/react';
import Exercise from '../src/Exercise';
import '@testing-library/jest-dom';

describe('Exercise component', () => {
  test('renders without crashing', () => {
    render(<Exercise />);
  });

  test('deletes a card when delete button is clicked', async () => {
    render(<Exercise />);

    // Check if card with text "push-ups" exists before deletion
    expect(screen.queryByText('push-ups')).toBeTruthy();

    // Click the delete button
    const deleteButton = screen.getByLabelText('Delete exercise');
    fireEvent.click(deleteButton);

    // Check if card with text "push-ups" is removed after deletion
    expect(screen.queryByText('push-ups')).toBeNull();
  });

  test('displays a form to add a new exercise', () => {
    render(<Exercise />);

    // Click the button to add a new exercise
    const addButton = screen.getByLabelText('Add exercise');
    fireEvent.click(addButton);

    // Check if the form for adding a new exercise is displayed
    expect(screen.getByLabelText('Exercise name')).toBeInTheDocument();
    expect(screen.getByLabelText('Target muscles')).toBeInTheDocument();
    expect(screen.getByLabelText('Reps')).toBeInTheDocument();
    expect(screen.getByLabelText('Sets')).toBeInTheDocument();
    expect(screen.getByLabelText('Weight')).toBeInTheDocument();
    expect(screen.getByLabelText('Image URL')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
