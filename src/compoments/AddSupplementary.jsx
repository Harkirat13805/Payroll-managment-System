import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSupplementary = () => {
  const [supplementary, setSupplementary] = useState({
    employee_id: "",
    bonus_amount: "",
    year: "",
    month: "",
    up_by: "",
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/addsupplementary-payment', supplementary)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/supplementary-payments')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Supplementary Payment</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputEmployee" className="form-label">
              Employee
            </label>
            <select
              className="form-select rounded-0"
              id="inputEmployee"
              onChange={(e) =>
                setSupplementary({ ...supplementary, employee_id: e.target.value })
              }
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label for="inputBonusAmount" className="form-label">
              Bonus Amount
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputBonusAmount"
              placeholder="Enter Bonus Amount"
              onChange={(e) =>
                setSupplementary({ ...supplementary, bonus_amount: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputYear" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputYear"
              placeholder="Enter Year"
              onChange={(e) =>
                setSupplementary({ ...supplementary, year: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputMonth" className="form-label">
              Month
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputMonth"
              placeholder="Enter Month (1-12)"
              min="1"
              max="12"
              onChange={(e) =>
                setSupplementary({ ...supplementary, month: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputUpBy" className="form-label">
              Up By
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputUpBy"
              placeholder="Enter Up By"
              onChange={(e) =>
                setSupplementary({ ...supplementary, up_by: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Supplementary Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplementary;