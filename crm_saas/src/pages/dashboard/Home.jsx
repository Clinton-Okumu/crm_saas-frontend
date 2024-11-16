import React, { useState } from 'react';
import SideBar from '../../components/layout/SideBar';
import TopNav from '../../components/layout/TopNav';
import DashboardContent from './DashboardContent';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <SideBar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
      />

      <main className="flex-1">
        <TopNav />
        <DashboardContent />
      </main>
    </div>
  );
};

export default DashboardLayout;
