import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import HRDashboard from '../../components/hrm/Dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <HRDashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;