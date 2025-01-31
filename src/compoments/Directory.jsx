import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Directory = () => {
    const [directory, setDirectory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/directory')
            .then(response => {
                if (response.data.Status) {
                    setDirectory(response.data.Result);
                }
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/delete_directory/`+id)
            .then(response => {
                if (response.data.Status) {
                    setDirectory(directory.filter(item => item.id !== id));
                }
            });
    };

    return (
        <div className="container">
            <h2>Directory</h2>
            <Link to="/dashboard/add_directory" className="btn btn-primary mb-2">Add New Entry</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DA_DIR</th>
                        <th>WEF</th>
                        <th>UPD_BY</th>
                        <th>UPD_DT</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {directory.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.DA_DIR}</td>
                            <td>{item.WEF}</td>
                            <td>{item.UPD_BY}</td>
                            <td>{item.UPD_DT}</td>
                            <td>
                                <Link to={`/dashboard/edit_directory/${item.id}`} className="btn btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Directory;
