import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PayrollList from '../../components/hrm/Payroll/PayrollList';

const EmployeePayrollPage = () => {
  return (
    <DashboardLayout>
      <PayrollList />
    </DashboardLayout>
  );
};

export default EmployeePayrollPage;

