import './JobCard.css'; // Import the CSS file for styling

import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onBookmark }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>Location: {job.primary_details?.Place || 'No location available'}</p>
      <p>Salary: {job.primary_details?.Salary || 'No salary available'}</p>
      <p>Phone: {job.whatsapp_no || 'No phone number available'}</p>
      <div className="button-container">
        <button className="bookmark-button" onClick={() => onBookmark(job.id)}>
          {job.is_bookmarked ? 'Unbookmark' : 'Bookmark'}
        </button>
        <Link to={`/job/${job.id}`} state={{ job }}>
          <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
