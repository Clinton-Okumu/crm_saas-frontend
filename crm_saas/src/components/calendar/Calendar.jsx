// components/calendar/Calendar.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week of first day in month (0-6)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Navigation handlers
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date to display month and year
  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month days
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const daysInPreviousMonth = getDaysInMonth(previousMonth);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPreviousMonth - i,
        isCurrentMonth: false,
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInPreviousMonth - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
      });
    }

    return days;
  };

  return (
    <div className="p-6">
      {/* Calendar Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{formatMonthYear(currentDate)}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Day
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-500 text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((day, index) => {
            const isToday = day.isCurrentMonth && 
              day.date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`
                  relative h-24 p-1 border rounded
                  ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                  ${isToday ? 'border-blue-500' : 'border-gray-200'}
                `}
              >
                <span
                  className={`
                    text-sm
                    ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${isToday ? 'font-bold text-blue-500' : ''}
                  `}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
