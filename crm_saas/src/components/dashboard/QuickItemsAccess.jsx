import React from 'react';
import PropTypes from 'prop-types';

const QuickAccessItem = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-7">
      <div className="flex items-start gap-6">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

QuickAccessItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default QuickAccessItem;