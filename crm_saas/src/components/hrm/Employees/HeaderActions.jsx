import React from 'react';
import { FileText, Video, Settings } from 'lucide-react';

const HeaderActions = () => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Employee Records</h1>
      <div className="flex gap-2 mt-4">
        <button className="bg-pink-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Docs
        </button>
        <button className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2">
          <Video className="w-4 h-4" />
          Video
        </button>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="bg-pink-500 text-white px-3 py-1.5 rounded-md text-sm">
        HR Report
      </button>
      <button className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm">
        Policies
      </button>
      <button className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm">
        Payroll
      </button>
      <button className="bg-gray-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </div>
  </div>
);

export default HeaderActions;