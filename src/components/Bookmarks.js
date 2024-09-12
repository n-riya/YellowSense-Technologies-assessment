import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './Bookmarks.css'; // Import the CSS file

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const fetchBookmarkedJobs = () => {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
      setBookmarkedJobs(storedBookmarks);
    };

    fetchBookmarkedJobs();
  }, []);

  return (
    <div className="bookmarks-container">
      <Typography variant="h4" gutterBottom>Bookmarked Jobs</Typography>
      {bookmarkedJobs.length === 0 ? (
        <Typography>No jobs bookmarked yet.</Typography>
      ) : (
        bookmarkedJobs.map((job) => (
          <Card key={job.id} sx={{ marginBottom: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{job.title}</Typography>
              <Typography color="textSecondary">Location: {job.primary_details?.Place || 'Not available'}</Typography>
              <Typography color="textSecondary">Salary: {job.primary_details?.Salary || 'Not available'}</Typography>
              <Typography color="textSecondary">Phone: {job.primary_details?.phone || 'Not available'}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
