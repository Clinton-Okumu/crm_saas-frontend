import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmployeeRecord from '../../components/hrm/Employees/EmployeeRecord.jsx';

const EmployeeRecordPage = () => {
  return (
    <DashboardLayout>
      <EmployeeRecord />
    </DashboardLayout>
  );
};

export default EmployeeRecordPage;

