import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [employeeCategories, setEmployeeCategories] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    fetchEmployeeCategories();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee);
        }
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const fetchEmployeeCategories = () => {
    axios.get('http://localhost:3000/auth/employee_categories')
      .then(result => {
        if (result.data.Status) {
          setEmployeeCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const pieData = {
    labels: employeeCategories.map(category => category.name),
    datasets: [
      {
        label: '# of Employees',
        data: employeeCategories.map(category => category.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw.toFixed(2); // Display value as whole number
            return label;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true, // Ensure the chart maintains its aspect ratio
    aspectRatio: 2, // Set the aspect ratio to adjust size
  };

  return (
    <div className="home-container">
      <div className='home-section'>
        <div className='card-container'>
          <div className='card shadow-sm'>
            <div className='card-header'>
              <h4>Admin</h4>
            </div>
            <div className='card-body'>
              <h5>Total: {adminTotal}</h5>
            </div>
          </div>
          <div className='card shadow-sm'>
            <div className='card-header'>
              <h4>Employee</h4>
            </div>
            <div className='card-body'>
              <h5>Total: {employeeTotal}</h5>
            </div>
          </div>
          <div className='card shadow-sm'>
            <div className='card-header'>
              <h4>Salary</h4>
            </div>
            <div className='card-body'>
              <h5>Total: ₹{salaryTotal}</h5>
            </div>
          </div>
        </div>
        <div className='chart-container'>
          <h3>Department Distribution </h3>
          <div className='chart'>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
          <h3>List of Admins</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(a => (
                <tr key={a.email}>
                  <td>{a.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Edit</button>
                    <button className="btn btn-warning btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
