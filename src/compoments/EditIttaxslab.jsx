import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditIttaxslab = () => {
    const { id } = useParams();
    const [Fin_year, setFin_year] = useState("");
    const [start_of_slab, setStart_of_slab] = useState("");
    const [end_of_slab, setEnd_of_slab] = useState("");
    const [percentage, setPercentage] = useState("");
    const [employee_typ, setEmployee_typ] = useState("");
    const [standard_ded, setStandard_ded] = useState("");
    const [he_cess, setHe_cess] = useState("");
    const [new_old, setNew_old] = useState("");
    const [upd_by, setUpd_by] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/it_tax_slab/${id}`)
            .then(response => {
                if (response.data.Status) {
                    const data = response.data.Result[0];
                    setFin_year(data.Fin_year);
                    setStart_of_slab(data.start_of_slab);
                    setEnd_of_slab(data.end_of_slab);
                    setPercentage(data.percentage);
                    setEmployee_typ(data.employee_typ);
                    setStandard_ded(data.standard_ded);
                    setHe_cess(data.he_cess);
                    setNew_old(data.new_old);
                    setUpd_by(data.upd_by);
                }
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_it_tax_slab/${id}`, { Fin_year, start_of_slab, end_of_slab, percentage, employee_typ, standard_ded, he_cess, new_old, upd_by })
            .then(response => {
                if (response.data.Status) {
                    navigate('/dashboard/it_tax_slab');
                }
            });
    };

    return (
        <div className="container">
            <h2>Edit IT Tax Slab Entry</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Fin Year</label>
                    <input type="text" className="form-control" value={Fin_year} onChange={(e) => setFin_year(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Start of Slab</label>
                    <input type="text" className="form-control" value={start_of_slab} onChange={(e) => setStart_of_slab(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">End of Slab</label>
                    <input type="text" className="form-control" value={end_of_slab} onChange={(e) => setEnd_of_slab(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Percentage</label>
                    <input type="text" className="form-control" value={percentage} onChange={(e) => setPercentage(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Employee Type</label>
                    <input type="text" className="form-control" value={employee_typ} onChange={(e) => setEmployee_typ(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Standard Deduction</label>
                    <input type="text" className="form-control" value={standard_ded} onChange={(e) => setStandard_ded(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">HE Cess</label>
                    <input type="text" className="form-control" value={he_cess} onChange={(e) => setHe_cess(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">New/Old</label>
                    <input type="text" className="form-control" value={new_old} onChange={(e) => setNew_old(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Updated By</label>
                    <input type="text" className="form-control" value={upd_by} onChange={(e) => setUpd_by(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditIttaxslab;
