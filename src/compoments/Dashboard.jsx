import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Dashboard.css"; // Import custom styles for Dashboard

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/'); // Redirect to login page after logout
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar" style={{ backgroundColor: '#3949ab' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/dashboard" className="brand-logo d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                EIL
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              {/* Dashboard Link */}
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                  <i className="bi bi-speedometer2 fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              {/* Manage Employees Link */}
              <li className="nav-item">
                <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-people fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              {/* Department Link */}
              <li className="nav-item">
                <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-columns fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Department</span>
                </Link>
              </li>
              {/* IT Tax Slab Link */}
              <li className="nav-item">
                <Link to="/dashboard/it_tax_slab" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-currency-dollar fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">IT Tax Slab</span>
                </Link>
              </li>
              {/* Computation Link */}
              <li className="nav-item">
                <Link to="/dashboard/salary_computations" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-calculator fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Computation</span>
                </Link>
              </li>
              {/* Queries & Reports Link */}
              <li className="nav-item">
                <Link to="/dashboard/reports" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-search fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Queries & Reports</span>
                </Link>
              </li>
              {/* Directory Link */}
              <li className="nav-item">
                <Link to="/dashboard/directory" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-folder fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Directory</span>
                </Link>
              </li>
              {/* Supplementary Payments Link */}
              <li className="nav-item">
                <Link to="/dashboard/supplementary-payments" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-wallet2 fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Supplementary Payments</span>
                </Link>
              </li>
              {/* Logout Link */}
              <li className="nav-item" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-power fs-4 me-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Main Content */}
        <div className="col p-0 m-0">
          {/* Navbar */}
          <div className="p-2 d-flex justify-content-center shadow bg-primary">
            <h4 className="text-white">Payroll & Tax System</h4>
          </div>
          {/* Outlet for Router */}
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
