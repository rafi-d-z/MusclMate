//import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Exercise from '../src/Exercise';

describe('Exercise component', () => {
  it('create exercise works', () => {
    render(<Exercise/>);

    const createExerciseButton = screen.getByText('+');
    fireEvent.click(createExerciseButton);

    const exerciseNameInput = screen.getByLabelText('exerciseName');
    fireEvent.change(exerciseNameInput, { target: { value: 'New Exercise' } });

    const targetMuscleSelect = screen.getByLabelText('targetMuscles');
    fireEvent.change(targetMuscleSelect, { target: { value: 'Arms' } });

    const repsInput = screen.getByLabelText('reps');
    fireEvent.change(repsInput, { target: { value: '10' } });

    const setsInput = screen.getByLabelText('sets');
    fireEvent.change(setsInput, { target: { value: '5' } });

    const weightInput = screen.getByLabelText('weight');
    fireEvent.change(weightInput, { target: { value: '15' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('New Exercise:', {
      name: 'New Exercise',
      target: 'Arms',
      reps: '10',
      sets: '5',
      weight: '15 lbs'
    });
  });
});

