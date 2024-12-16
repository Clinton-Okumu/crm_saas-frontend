import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CrmDashboard from "../../components/crm/CrmDashboard";

const CrmDashboardPage = () => {
  return (
    <DashboardLayout>
      <CrmDashboard />
    </DashboardLayout>
  );
};

export default CrmDashboardPage;
