import React from 'react';
import PropTypes from 'prop-types';

const EventItem = ({ icon: Icon, title, time, bgColor = 'blue' }) => (
  <div className="flex items-center space-x-3">
    <div className={`bg-${bgColor}-100 p-2 rounded-lg`}>
      <Icon className={`h-4 w-4 text-${bgColor}-500`} />
    </div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

EventItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  bgColor: PropTypes.string
};

export default EventItem;