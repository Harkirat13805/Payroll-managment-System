import React, { useEffect, useState } from "react";
import axios from "axios";

const Computation = () => {
    const [computations, setComputations] = useState([]);

    useEffect(() => {
        fetchEmployeeSalaries();
    }, []);

    const fetchEmployeeSalaries = () => {
        axios.get('http://localhost:3000/auth/employee_salaries')
            .then(response => {
                if (response.data.Status) {
                    const computedData = response.data.Result.map(employee => {
                        const salary = employee.salary;
                        const DA = salary * 0.4; // 40% of salary
                        const HRA = salary * 0.25; // 25% of salary
                        const PF = salary * 0.12; // 12% of salary
                        const TOTAL_MONTHLY_SALARY =salary + DA + HRA - PF;
                        const TOTAL_ANNUAL_SALARY = TOTAL_MONTHLY_SALARY * 12;
                        return {
                            id: employee.id,
                            name: employee.name,
                            salary: salary,
                            DA: DA,
                            HRA: HRA,
                            PF: PF,
                            TOTAL_MONTHLY_SALARY: TOTAL_MONTHLY_SALARY,
                            TOTAL_ANNUAL_SALARY: TOTAL_ANNUAL_SALARY
                        };
                    });
                    setComputations(computedData);
                } else {
                    console.error("Failed to fetch employee salaries:", response.data.Error);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the employee salaries!", error);
            });
    };

    return (
        <div className="container">
            <h2>Salary Computations</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Basic Pay</th>
                        <th>DA</th>
                        <th>HRA</th>
                        <th>PF</th>
                        <th>Total Monthly Salary</th>
                        <th>Total Annual Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {computations.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.salary.toFixed(2)}</td>
                            <td>{item.DA.toFixed(2)}</td>
                            <td>{item.HRA.toFixed(2)}</td>
                            <td>{item.PF.toFixed(2)}</td>
                            <td>{item.TOTAL_MONTHLY_SALARY.toFixed(2)}</td>
                            <td>{item.TOTAL_ANNUAL_SALARY.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Computation;
