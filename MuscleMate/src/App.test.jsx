import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'; // Mock axios
import App from './App';

// Mock axios response
jest.mock('axios');
const mockedAxios = axios;

describe('App', () => {
  beforeEach(() => {
    // Mock axios response data
    mockedAxios.get.mockResolvedValue({ status: 200, data: 'Mocked response' });
  });

  it('renders App component', async () => {
    render(<App />);
    // Check if logos are present
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();
    // Check if initial count is rendered
    expect(screen.getByText('count is 0')).toBeInTheDocument();
    // Check if initial paragraph text is present
    expect(screen.getByText('Edit src/App.jsx and save to test HMR')).toBeInTheDocument();
  });

  it('increments count when button is clicked', async () => {
    render(<App />);
    const countButton = screen.getByText('count is 0')?.closest('button');
    fireEvent.click(countButton); // Increment count
    expect(screen.getByText('count is 1')).toBeInTheDocument();
  });

  it('calls API on component mount', async () => {
    render(<App />);
    // Wait for API call to resolve
    await screen.findByText('Mocked response');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/');
  });
});
