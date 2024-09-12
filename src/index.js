import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new import for React 18
import App from './App';
import './styles.css'; // Import your CSS file here

// Create a root container and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
