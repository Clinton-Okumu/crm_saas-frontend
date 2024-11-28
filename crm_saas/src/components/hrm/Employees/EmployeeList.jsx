import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

const EmployeesList = () => {
 const [employees, setEmployees] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [departmentFilter, setDepartmentFilter] = useState('');
 const [positionFilter, setPositionFilter] = useState('');
 const [activeFilter, setActiveFilter] = useState('');

 useEffect(() => {
   loadEmployees();
 }, [searchQuery, departmentFilter, positionFilter, activeFilter]);

 const loadEmployees = async () => {
   try {
     setLoading(true);
     setEmployees([]);
   } catch (error) {
     console.error('Error:', error);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="space-y-8 px-6 py-4">
     {/* Header */}
     <div className="flex items-center justify-between">
       <h1 className="text-2xl font-semibold text-gray-800">Employee Records</h1>
       <div className="flex items-center gap-3">
         <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg text-sm transition-colors">
           HR Report
         </button>
         <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm transition-colors">
           Policies
         </button>
         <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm transition-colors">
           Payroll
         </button>
         <button className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
           <Settings className="w-4 h-4" />
           Settings
         </button>
       </div>
     </div>

     {/* Search & Filters */}
     <div className="flex items-center gap-3">
       <input
         type="text"
         placeholder="Search employees..."
         className="flex-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       />
       <select
         className="px-4 py-2.5 border rounded-lg bg-white min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500"
         value={departmentFilter}
         onChange={(e) => setDepartmentFilter(e.target.value)}
       >
         <option value="">All Departments</option>
       </select>
       <select
         className="px-4 py-2.5 border rounded-lg bg-white min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500"
         value={positionFilter}
         onChange={(e) => setPositionFilter(e.target.value)}
       >
         <option value="">All Positions</option>
       </select>
       <select
         className="px-4 py-2.5 border rounded-lg bg-white min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500"
         value={activeFilter}
         onChange={(e) => setActiveFilter(e.target.value)}
       >
         <option value="">All Status</option>
         <option value="true">Active</option>
         <option value="false">Inactive</option>
       </select>
     </div>

     {/* Employee Table */}
     <div className="bg-white rounded-lg shadow border border-gray-200">
       {loading ? (
         <div className="p-8 text-center text-gray-500">Loading...</div>
       ) : (
         <div>Employee table content</div>
       )}
     </div>
   </div>
 );
};

export default EmployeesList;