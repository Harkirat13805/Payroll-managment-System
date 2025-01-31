import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Supplementary = () => {
  const [supplementaryPayments, setSupplementaryPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/supplementary-payments")
      .then((result) => {
        if (result.data.Status) {
          setSupplementaryPayments(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/deletesupplementary-payment/${id}`)
      .then(result => {
        if(result.data.Status) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Supplementary Payments List</h3>
      </div>
      <Link to="/dashboard/addsupplementary-payment" className="btn btn-success">
        Add Supplementary Payment
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Bonus Amount</th>
              <th>Year</th>
              <th>Month</th>
              <th>Up By</th>
              <th>Up Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {supplementaryPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.employee_id}</td>
                <td>{payment.bonus_amount}</td>
                <td>{payment.year}</td>
                <td>{payment.month}</td>
                <td>{payment.up_by}</td>
                <td>{payment.up_date}</td>
                <td>
                  <Link
                    to={`/dashboard/editsupplementary-payment/${payment.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(payment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supplementary;