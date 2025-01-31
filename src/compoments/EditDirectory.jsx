import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDirectory = () => {
    const [DA_DIR, setDA_DIR] = useState("");
    const [WEF, setWEF] = useState("");
    const [UPD_BY, setUPD_BY] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/directory/${id}`)
            .then(response => {
                if (response.data.Status) {
                    const directory = response.data.Result[0];
                    setDA_DIR(directory.DA_DIR);
                    setWEF(directory.WEF);
                    setUPD_BY(directory.UPD_BY);
                }
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_directory/${id}`, { DA_DIR, WEF, UPD_BY })
            .then(response => {
                if (response.data.Status) {
                    navigate('/dashboard/directory');
                }
            });
    };

    return (
        <div className="container">
            <h2>Edit Directory Entry</h2>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditDirectory;
