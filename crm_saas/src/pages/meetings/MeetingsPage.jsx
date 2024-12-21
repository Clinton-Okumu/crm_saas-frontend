import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Meetings from "../../components/meetings/Meetings";

const MeetingsPage = () => {
  return (
    <DashboardLayout>
      <Meetings />
    </DashboardLayout>
  );
};

export default MeetingsPage;
