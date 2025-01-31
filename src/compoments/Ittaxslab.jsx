import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ittaxslab = () => {
    const [slabs, setSlabs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/it_tax_slab')
            .then(response => {
                if (response.data.Status) {
                    setSlabs(response.data.Result);
                }
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/delete_it_tax_slab/`+id)
            .then(response => {
                if (response.data.Status) {
                    setSlabs(slabs.filter(item => item.id !== id));
                }
            });
    };

    return (
        <div className="container">
            <h2>IT Tax Slabs</h2>
            <Link to="/dashboard/add_it_tax_slab" className="btn btn-primary mb-2">Add New Entry</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fin Year</th>
                        <th>Start of Slab</th>
                        <th>End of Slab</th>
                        <th>Percentage</th>
                        <th>Employee Type</th>
                        <th>Standard Deduction</th>
                        <th>HE Cess</th>
                        <th>New/Old</th>
                        <th>Updated By</th>
                        <th>Updated Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slabs.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.Fin_year}</td>
                            <td>{item.start_of_slab}</td>
                            <td>{item.end_of_slab}</td>
                            <td>{item.percentage}</td>
                            <td>{item.employee_typ}</td>
                            <td>{item.standard_ded}</td>
                            <td>{item.he_cess}</td>
                            <td>{item.new_old}</td>
                            <td>{item.upd_by}</td>
                            <td>{item.upd_dt}</td>
                            <td>
                                <Link to={`/dashboard/edit_it_tax_slab/${item.id}`} className="btn btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ittaxslab;
