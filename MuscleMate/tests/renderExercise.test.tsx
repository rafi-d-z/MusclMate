//import React from 'react';
import { render } from '@testing-library/react';
import Exercise from '../src/Exercise';

describe('Exercise component', () => {
  test('renders without crashing', () => {
    render(<Exercise />);
  });
});
