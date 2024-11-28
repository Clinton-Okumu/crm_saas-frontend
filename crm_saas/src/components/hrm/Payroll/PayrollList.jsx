import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PayrollList = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/payroll-records/');
        setPayrollRecords(response.data);
      } catch (err) {
        setError('Failed to load payroll records. Please try again.');
        console.error('Error fetching payroll records:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollRecords();
  }, []);

  return (
    <div>
      <h1>Payroll Records</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Job Title</th>
              <th>Basic Salary</th>
              <th>Total Earnings</th>
              <th>Deductions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollRecords.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.employee_name}</td>
                <td>{record.job_title}</td>
                <td>{record.basic_salary}</td>
                <td>{record.total_earnings}</td>
                <td>{record.deductions}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PayrollList;
