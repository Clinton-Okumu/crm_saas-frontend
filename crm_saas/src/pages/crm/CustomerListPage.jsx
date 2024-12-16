import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Customers from "../../components/crm/CustomerList";

const CustomerListPage = () => {
  return (
    <DashboardLayout>
      <Customers />
    </DashboardLayout>
  );
};

export default CustomerListPage;
