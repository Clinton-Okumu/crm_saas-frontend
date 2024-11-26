import React from 'react';
import PropTypes from 'prop-types';

const QuickActionButton = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
  >
    {children}
  </button>
);

QuickActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

export default QuickActionButton;