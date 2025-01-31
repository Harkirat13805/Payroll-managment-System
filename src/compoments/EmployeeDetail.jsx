import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../EmployeeDetail.css';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [department, setDepartment] = useState('');
  const [salaryDetails, setSalaryDetails] = useState({
    salary: 0,
    da: 0,
    hra: 0,
    pf: 0,
    bonus: 0,
    tax: 0,
    totalMonthlySalary: 0,
    totalAnnualSalary: 0,
    netAnnualSalary: 0
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      const employeeResult = await axios.get(`http://localhost:3000/employee/detail/${id}`);
      const fetchedEmployee = employeeResult.data[0];
      setEmployee(fetchedEmployee);
      
      await fetchDepartment(fetchedEmployee.category_id);
      await fetchBonusAndCalculateSalary(fetchedEmployee.id, fetchedEmployee.salary);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartment = async (categoryId) => {
    try {
      const result = await axios.get(`http://localhost:3000/payroll-tax/category/${categoryId}`);
      if (result.data.Status) {
        setDepartment(result.data.Result.name);
      } else {
        console.log("Failed to fetch department");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBonusAndCalculateSalary = async (employeeId, baseSalary) => {
    try {
      const result = await axios.get(`http://localhost:3000/supplementary-payments/${employeeId}`);
      const bonusAmount = result.data.Status && result.data.Result.length > 0 ? result.data.Result[0].bonus_amount : 0;
      calculateSalary(baseSalary, bonusAmount);
    } catch (err) {
      console.log("Error fetching bonus:", err);
      calculateSalary(baseSalary, 0);
    }
  };

  const calculateSalary = (baseSalary, bonusAmount) => {
    const da = baseSalary * 0.4;
    const hra = baseSalary * 0.25;
    const pf = baseSalary * 0.12;
    const totalMonthlySalary = baseSalary + da + hra - pf;
    const totalAnnualSalary = totalMonthlySalary * 12 + bonusAmount;

    // Calculate tax based on it_tax_slab
    const tax = calculateTax(totalAnnualSalary);

    const netAnnualSalary = totalAnnualSalary - tax;

    setSalaryDetails({
      salary: baseSalary,
      da: da,
      hra: hra,
      pf: pf,
      bonus: bonusAmount,
      tax: tax,
      totalMonthlySalary: totalMonthlySalary,
      totalAnnualSalary: totalAnnualSalary,
      netAnnualSalary: netAnnualSalary
    });
  };

  const calculateTax = (annualSalary) => {
    // Simplified tax calculation
    let tax = 0;
    if (annualSalary > 250000 && annualSalary <= 500000) {
      tax = (annualSalary - 250000) * 0.05;
    } else if (annualSalary > 500000 && annualSalary <= 1000000) {
      tax = 12500 + (annualSalary - 500000) * 0.2;
    } else if (annualSalary > 1000000) {
      tax = 112500 + (annualSalary - 1000000) * 0.3;
    }
    return tax;
  };

  const printPayrollSlip = () => {
    window.print();
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="employee-detail-container">
      <div className="employee-detail-card">
        <h2 className="employee-detail-title">Employee Management System</h2>
        <div className="employee-detail-content">
          <div className="employee-image">
            <img src={`http://localhost:3000/Images/${employee.image}`} alt="Employee" />
          </div>
          <div className="employee-info">
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{employee.name}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <th>Address:</th>
                  <td>{employee.address}</td>
                </tr>
                <tr>
                  <th>Base Salary:</th>
                  <td>₹{salaryDetails.salary.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>DA:</th>
                  <td>₹{salaryDetails.da.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>HRA:</th>
                  <td>₹{salaryDetails.hra.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>PF:</th>
                  <td>₹{salaryDetails.pf.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Bonus Amount:</th>
                  <td>₹{salaryDetails.bonus.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Tax:</th>
                  <td>₹{salaryDetails.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Total Monthly Salary:</th>
                  <td>₹{salaryDetails.totalMonthlySalary.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Total Annual Salary:</th>
                  <td>₹{salaryDetails.totalAnnualSalary.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Net Annual Salary:</th>
                  <td>₹{salaryDetails.netAnnualSalary.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="employee-detail-actions">
          <button className="btn-print" onClick={printPayrollSlip}>Print</button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;