import React from 'react';
import PropTypes from 'prop-types';

const EmployeeFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  departmentFilter, 
  setDepartmentFilter,
  positionFilter, 
  setPositionFilter,
  activeFilter, 
  setActiveFilter 
}) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <div className="flex-1 min-w-[200px]">
      <input
        type="text"
        placeholder="Search employees..."
        className="w-full px-3 py-2 border rounded-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <select
      className="px-3 py-2 border rounded-md"
      value={departmentFilter}
      onChange={(e) => setDepartmentFilter(e.target.value)}
    >
      <option value="">All Departments</option>
    </select>
    <select
      className="px-3 py-2 border rounded-md"
      value={positionFilter}
      onChange={(e) => setPositionFilter(e.target.value)}
    >
      <option value="">All Positions</option>
    </select>
    <select
      className="px-3 py-2 border rounded-md"
      value={activeFilter}
      onChange={(e) => setActiveFilter(e.target.value)}
    >
      <option value="">All Status</option>
      <option value="true">Active</option>
      <option value="false">Inactive</option>
    </select>
  </div>
);

EmployeeFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  departmentFilter: PropTypes.string.isRequired,
  setDepartmentFilter: PropTypes.func.isRequired,
  positionFilter: PropTypes.string.isRequired,
  setPositionFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired
};

export default EmployeeFilters;