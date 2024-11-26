import React from 'react';
import PropTypes from 'prop-types';

const RecentActivityItem = ({ icon: Icon, title, time, status }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center space-x-3">
      <div className="bg-gray-100 p-2 rounded-full">
        <Icon className="h-4 w-4 text-gray-600" />
      </div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full ${
      status === 'Completed' ? 'bg-green-100 text-green-700' : 
      status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
      'bg-blue-100 text-blue-700'
    }`}>
      {status}
    </span>
  </div>
);

RecentActivityItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Completed', 'Pending', 'In Progress']).isRequired
};

export default RecentActivityItem;