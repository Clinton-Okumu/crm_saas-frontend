import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PayrollList from '../../components/hrm/Payroll/PayrollList';

const PayrollRecordsPage = () => {
  return (
    <DashboardLayout>
      <PayrollList />
    </DashboardLayout>
  );
};

export default PayrollRecordsPage;