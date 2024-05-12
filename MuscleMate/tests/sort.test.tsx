import { render, screen } from '@testing-library/react';
import Exercise from '../src/Exercise';

describe('Exercise component', () => {
  test('renders exercises in alphabetical order', () => {
    render(<Exercise />);
    
    // Find all exercise titles
    const exerciseTitles = screen.getAllByTestId('data.exercise_name')
      .map(title => title.textContent || ''); // Handle null values

    // Check if exercise titles are sorted alphabetically
    for (let i = 0; i < exerciseTitles.length - 1; i++) {
      const currentTitle = exerciseTitles[i];
      const nextTitle = exerciseTitles[i + 1];
      expect(currentTitle.localeCompare(nextTitle)).toBeLessThanOrEqual(0);
    }
  });
});
