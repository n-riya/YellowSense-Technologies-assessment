import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
        if (response.data && Array.isArray(response.data.results)) {
          // Load existing bookmarks
          const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
          const bookmarkedJobIds = new Set(storedBookmarks.map(job => job.id));

          // Update jobs list
          setJobs((prevJobs) => {
            const existingJobIds = new Set(prevJobs.map(job => job.id));
            const newJobs = response.data.results.map(job => ({
              ...job,
              is_bookmarked: bookmarkedJobIds.has(job.id)
            })).filter(job => !existingJobIds.has(job.id));
            return [...prevJobs, ...newJobs];
          });
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch jobs');
      }
      setLoading(false);
    };

    fetchJobs();
  }, [page]);

  const handleBookmark = (jobId) => {
    const updatedJobs = jobs.map(job =>
      job.id === jobId ? { ...job, is_bookmarked: !job.is_bookmarked } : job
    );
    setJobs(updatedJobs);

    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    const jobToUpdate = updatedJobs.find(job => job.id === jobId);

    if (jobToUpdate.is_bookmarked) {
      // Add job to bookmarks if it is not already there
      if (!storedBookmarks.some(job => job.id === jobId)) {
        localStorage.setItem('bookmarkedJobs', JSON.stringify([...storedBookmarks, jobToUpdate]));
      }
    } else {
      // Remove job from bookmarks
      const updatedBookmarks = storedBookmarks.filter(job => job.id !== jobId);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
    }
  };

  return (
    <div>
        <p></p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {jobs.length === 0 && !loading && <p>No jobs available</p>}
      {jobs.length > 0 && jobs.map((job) => (
        <JobCard key={job.id} job={job} onBookmark={() => handleBookmark(job.id)} />
      ))}
      <button className="load-more-button" onClick={() => setPage(page + 1)} disabled={loading}>
        {loading ? 'Loading...' : 'Load More Jobs'}
      </button>
    </div>
  );
};

export default Jobs;
