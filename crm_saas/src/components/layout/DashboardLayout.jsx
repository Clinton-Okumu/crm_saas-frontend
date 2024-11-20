import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import TopNav from './TopNav';

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <SideBar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
      />
      <div className="flex-1">
        <TopNav />
        {children}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardLayout;