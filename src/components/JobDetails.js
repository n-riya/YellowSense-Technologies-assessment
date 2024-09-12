// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const JobDetails = () => {
//   const location = useLocation();
//   const { job } = location.state;  // job data passed via state

//   return (
//     <div className="job-details">
//       <h2>{job.title}</h2>
//       <p><strong>Location:</strong> {job.primary_details?.Place || 'No location available'}</p>
//       <p><strong>Salary:</strong> {job.primary_details?.Salary || 'No salary available'}</p>
//       <p><strong>Description:</strong> {job.primary_details?.description || 'No description available'}</p>
//       <p><strong>Phone:</strong> {job.primary_details?.phone || 'No phone number available'}</p>
//       {/* Add more job-specific details as necessary */}
//     </div>
//   );
// };

// export default JobDetails;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css'; // Import the CSS file for styling

const JobDetails = () => {
  const location = useLocation();
  const { job } = location.state; // job data passed via state
  const [fullJobDetails, setFullJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFullJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${job.id}`);
        console.log(response.data); // Check the structure here
        setFullJobDetails(response.data);
      } catch (err) {
        setError('Failed to fetch job details');
      }
      setLoading(false);
    };

    fetchFullJobDetails();
  }, [job.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Access fields based on the actual response structure
  return (
    <div className="job-details">
      {fullJobDetails ? (
        <div>
          <h2>{fullJobDetails.title}</h2>

        

          <p><strong>Location:</strong> {job.primary_details?.Place || 'No location available'}</p>
          <p><strong>Salary:</strong> {job.primary_details?.Salary || 'No salary available'}</p>
          <p><strong>Description:</strong> {job.primary_details?.description || 'No description available'}</p>
          <p><strong>Phone:</strong> {job.whatsapp_no || 'No phone number available'}</p>
          <p><strong>Job Type:</strong> {job.primary_details?.Job_Type || 'No job type available'}</p>
          <p><strong>Experience:</strong> {job.primary_details?.Experience || 'No experience information available'}</p>
          <p><strong>Qualification:</strong> {job.primary_details?.Qualification || 'No qualification information available'}</p>
          <p><strong>Shift Timing:</strong> {job.primary_details?.shift_timing || 'No shift timing information available'}</p>
          
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default JobDetails;
