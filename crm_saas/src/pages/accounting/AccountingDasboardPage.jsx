import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AccountingDashboard from "../../components/accounting/AccountingDashboard";

const AccountingDashboardPage = () => {
  return (
    <DashboardLayout>
      <AccountingDashboard />
    </DashboardLayout>
  );
};

export default AccountingDashboardPage;
