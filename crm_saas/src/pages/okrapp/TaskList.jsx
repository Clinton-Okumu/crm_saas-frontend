import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import TaskListSection from '../../components/okrapp/TaskList';

const TaskList = () => {
  return (
    <DashboardLayout>
      <TaskListSection />
    </DashboardLayout>
  );
};

export default TaskList;
