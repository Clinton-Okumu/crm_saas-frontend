import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Expenses from "../../components/accounting/Expenses";

const AccountingDashboardPage = () => {
  return (
    <DashboardLayout>
      <Expenses />
    </DashboardLayout>
  );
};

export default AccountingDashboardPage;
