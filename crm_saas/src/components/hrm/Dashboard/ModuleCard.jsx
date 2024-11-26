import React from 'react';
import PropTypes from 'prop-types';

const ModuleCard = ({ title, icon: Icon, items }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center">
        <Icon className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
    <div className="p-4">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

ModuleCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ModuleCard;