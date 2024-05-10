//import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {NewExerciseCard} from '@/components/ui/newExerciseCard';

test('clicking cancel button resets input fields', () => {
  render(<NewExerciseCard />);

  // Input fields before clicking cancel
  const exerciseNameInput = screen.getByLabelText('Name:') as HTMLInputElement;
  const repsInput = screen.getByLabelText('Reps:') as HTMLInputElement;
  const setsInput = screen.getByLabelText('Sets:') as HTMLInputElement;
  const weightInput = screen.getByLabelText('Weight:') as HTMLInputElement;

  // Change input values
  fireEvent.change(exerciseNameInput, { target: { value: 'Test Exercise' } });
  fireEvent.change(repsInput, { target: { value: '10' } });
  fireEvent.change(setsInput, { target: { value: '3' } });
  fireEvent.change(weightInput, { target: { value: '50' } });

  // Click cancel button
  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

  // Assert input fields are reset
  expect(exerciseNameInput.value).toBe('Pull ups');
  expect(repsInput.value).toBe('3');
  expect(setsInput.value).toBe('12');
  expect(weightInput.value).toBe('none');
});
