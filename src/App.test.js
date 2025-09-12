// Import utilities for rendering components and querying the virtual DOM
import { render, screen } from '@testing-library/react';
// Import the component under test
import App from './App';

// Define a Jest test to verify that the "learn react" link renders in the App
test('renders learn react link', () => {
  // Render the App component into the testing environment's virtual DOM
  render(<App />);
  // Find an element whose text matches the case-insensitive regex /learn react/i
  const linkElement = screen.getByText(/learn react/i);
  // Assert that the element is present in the document (provided by @testing-library/jest-dom)
  expect(linkElement).toBeInTheDocument();
});