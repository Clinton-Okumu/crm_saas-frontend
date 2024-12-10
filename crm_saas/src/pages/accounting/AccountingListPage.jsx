import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AccountingList from "../../components/accounting/AccountingList";

const AccountingDashboardPage = () => {
  return (
    <DashboardLayout>
      <AccountingList />
    </DashboardLayout>
  );
};

export default AccountingDashboardPage;
