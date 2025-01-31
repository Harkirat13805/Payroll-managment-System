import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditSupplementary = () => {
    const {id} = useParams()
    const [supplementary, setSupplementary] = useState({
        employee_id: "",
        bonus_amount: "",
        year: "",
        month: "",
        up_by: "",
    });
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
        .then(result => {
            if(result.data.Status) {
                setEmployees(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get(`http://localhost:3000/auth/supplementary-payments/${id}`)
        .then(result => {
            setSupplementary({
                ...supplementary,
                employee_id: result.data.Result[0].employee_id,
                bonus_amount: result.data.Result[0].bonus_amount,
                year: result.data.Result[0].year,
                month: result.data.Result[0].month,
                up_by: result.data.Result[0].up_by,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/auth/editsupplementary-payment/${id}`, supplementary)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/supplementary-payments')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Supplementary Payment</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputEmployee" className="form-label">
                            Employee
                        </label>
                        <select
                            className="form-select rounded-0"
                            id="inputEmployee"
                            value={supplementary.employee_id}
                            onChange={(e) =>
                                setSupplementary({ ...supplementary, employee_id: e.target.value })
                            }
                        >
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
                            value={supplementary.bonus_amount}
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
                            value={supplementary.year}
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
                            placeholder="Enter Month"
                            min="1"
                            max="12"
                            value={supplementary.month}
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
                            value={supplementary.up_by}
                            onChange={(e) =>
                                setSupplementary({ ...supplementary, up_by: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Supplementary Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSupplementary