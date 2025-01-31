import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios
      .get('http://localhost:3000/auth/reports')
      .then((response) => {
        if (response.data.Status) {
          setReports(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error('Error fetching reports:', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_report/${id}`)
      .then((response) => {
        if (response.data.Status) {
          fetchReports();
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error('Error deleting report:', error));
  };

  return (
    <div className="container">
      <h3 className="my-4">Reports</h3>
      <Link to="/dashboard/add_report" className="btn btn-success mb-3">
        Add Report
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.title}</td>
              <td>{report.description}</td>
              <td>
                <Link to={`/dashboard/edit_report/${report.id}`} className="btn btn-info me-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(report.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
