import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CreateMeetingPage from "../../components/meetings/CreateMeetings";

const MeetingsPage = () => {
  return (
    <DashboardLayout>
      <CreateMeetingPage />
    </DashboardLayout>
  );
};

export default MeetingsPage;
