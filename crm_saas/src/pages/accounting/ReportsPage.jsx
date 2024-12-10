import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Reports from "../../components/accounting/Reports";

const AccountingDashboardPage = () => {
  return (
    <DashboardLayout>
      <Reports />
    </DashboardLayout>
  );
};

export default AccountingDashboardPage;
