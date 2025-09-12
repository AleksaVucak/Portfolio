// Import React to enable JSX and component definitions
import React from 'react';
// Import the modern React DOM client for creating a root
import ReactDOM from 'react-dom/client';
// Import global styles for the application
import './index.css';
// Import the root App component to render
import App from './App';
// Import performance measurement helper (optional)
import reportWebVitals from './reportWebVitals';

// Create a root React rendering target using the DOM element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application into the root with additional checks in development mode
root.render(
  // Enable additional runtime checks and warnings in development
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Invoke web vitals reporting (you can pass a function to log results or send to analytics)
reportWebVitals();