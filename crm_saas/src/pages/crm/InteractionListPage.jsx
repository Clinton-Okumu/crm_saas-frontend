import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Interactions from "../../components/crm/InteractionList";

const InteractionListPage = () => {
  return (
    <DashboardLayout>
      <Interactions />
    </DashboardLayout>
  );
};

export default InteractionListPage;
