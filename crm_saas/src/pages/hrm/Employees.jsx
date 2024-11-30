import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmployeesList from '../../components/hrm/Employees/EmployeeList';

const EmployeeRecordsPage = () => {
  return (
    <DashboardLayout>
      <EmployeesList />
    </DashboardLayout>
  );
};

export default EmployeeRecordsPage;
