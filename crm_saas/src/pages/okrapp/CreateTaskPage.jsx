import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CreateTaskPage from "../../components/okrapp/CreateTasks";

const CreateTask = () => {
  return (
    <DashboardLayout>
      <CreateTaskPage />
    </DashboardLayout>
  );
};

export default CreateTask;
