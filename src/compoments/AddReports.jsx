import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddReport = () => {
  const [report, setReport] = useState({
    title: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/auth/add_report', report)
      .then((response) => {
        if (response.data.Status) {
          navigate('/dashboard/reports');
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error('Error adding report:', error));
  };

  return (
    <div className="container">
      <h3 className="my-4">Add Report</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={report.title}
            onChange={(e) => setReport({ ...report, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={report.description}
            onChange={(e) => setReport({ ...report, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Report
        </button>
      </form>
    </div>
  );
};

export default AddReport;
