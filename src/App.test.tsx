import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders MindRight text in Homepage component', () => {
  render(<App />);
  const title = screen.getByText(/MindRight/);
  expect(title).toBeInTheDocument();
});
