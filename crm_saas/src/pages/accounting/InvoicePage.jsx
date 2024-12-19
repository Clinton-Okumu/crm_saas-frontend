import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Invoice from "../../components/accounting/Invoice";

const AccountingDashboardPage = () => {
  return (
    <DashboardLayout>
      <Invoice />
    </DashboardLayout>
  );
};

export default AccountingDashboardPage;
