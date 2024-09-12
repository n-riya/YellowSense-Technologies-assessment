
import './App.css';  // Add this if you haven't already

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetails from './components/JobDetails';  // Import JobDetails component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Jobs</Link></li>
            <li><Link to="/bookmarks">Bookmarks</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/job/:id" element={<JobDetails />} />  {/* Route for job details */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
