import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDirectory = () => {
    const [DA_DIR, setDA_DIR] = useState("");
    const [WEF, setWEF] = useState("");
    const [UPD_BY, setUPD_BY] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_directory', { DA_DIR, WEF, UPD_BY })
            .then(response => {
                if (response.data.Status) {
                    navigate('/dashboard/directory');
                }
            });
    };

    return (
        <div className="container">
            <h2>Add Directory Entry</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">DA_DIR</label>
                    <input type="text" className="form-control" value={DA_DIR} onChange={(e) => setDA_DIR(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">WEF</label>
                    <input type="date" className="form-control" value={WEF} onChange={(e) => setWEF(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">UPD_BY</label>
                    <input type="text" className="form-control" value={UPD_BY} onChange={(e) => setUPD_BY(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};

export default AddDirectory;
