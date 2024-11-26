import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold mt-1">{value}</h3>
        {change && (
          <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {change} from last month
          </p>
        )}
      </div>
      <div className="bg-blue-50 p-3 rounded-full">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string
};

export default StatCard;