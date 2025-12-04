import React from 'react';

const Calendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    // Simple calendar generation (mock logic for visual)
    const generateDays = () => {
        const daysArr = [];
        for (let i = 1; i <= 31; i++) {
            daysArr.push(i);
        }
        return daysArr;
    };

    const events = {
        5: "Team Meeting",
        12: "Project Deadline",
        24: "Server Maintenance",
        28: "Holiday"
    };

    return (
        <div className="p-8 text-white h-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    {currentMonth} {currentYear}
                </h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Previous</button>
                    <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">Next</button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4 text-center text-gray-400 font-medium">
                {days.map(day => <div key={day}>{day}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-4 h-[600px]">
                {generateDays().map(day => (
                    <div
                        key={day}
                        className={`bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors relative flex flex-col ${events[day] ? 'ring-1 ring-blue-500/50' : ''}`}
                    >
                        <span className={`text-sm font-bold ${day === currentDate.getDate() ? 'bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                            {day}
                        </span>

                        {events[day] && (
                            <div className="mt-2 p-2 bg-blue-500/20 text-blue-200 text-xs rounded border border-blue-500/30">
                                {events[day]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
