//import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Exercise from '../src/Exercise';

describe('Exercise component', () => {
  it('create exercise works', () => {
    render(<Exercise />);

    const createExerciseButton = screen.getByText('Create Exercise');
    fireEvent.click(createExerciseButton);

    const exerciseNameInput = screen.getByLabelText('Exercise Name');
    fireEvent.change(exerciseNameInput, { target: { value: 'New Exercise' } });

    const targetMuscleSelect = screen.getByLabelText('Target Muscles');
    fireEvent.change(targetMuscleSelect, { target: { value: 'Arms' } });

    const repsInput = screen.getByLabelText('Reps');
    fireEvent.change(repsInput, { target: { value: '12' } });

    const setsInput = screen.getByLabelText('Sets');
    fireEvent.change(setsInput, { target: { value: '3' } });

    const weightInput = screen.getByLabelText('Weight');
    fireEvent.change(weightInput, { target: { value: '15' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('New Exercise:', {
      name: 'New Exercise',
      reps: '12',
      sets: '3',
      weight: '15 lbs'
    });
  });
});

