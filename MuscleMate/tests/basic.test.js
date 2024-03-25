/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import test from 'jest';

test('renders without crashing', () => {
    render(<App />);
});
