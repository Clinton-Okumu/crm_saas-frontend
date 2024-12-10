import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Sales from "../../components/accounting/Sales";

const AccountingDashboardPage = () => {
  return (
    <DashboardLayout>
      <Sales />
    </DashboardLayout>
  );
};

export default AccountingDashboardPage;
