import React from 'react';

const Learning = () => {
    const courses = [
        { id: 1, title: "React Mastery", progress: 75, total: 20, completed: 15, color: "from-blue-500 to-cyan-500" },
        { id: 2, title: "Python Backend", progress: 40, total: 15, completed: 6, color: "from-yellow-500 to-orange-500" },
        { id: 3, title: "DevOps Basics", progress: 10, total: 10, completed: 1, color: "from-purple-500 to-pink-500" },
    ];

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Learning Center
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                        <div className={`h-32 rounded-xl bg-gradient-to-br ${course.color} mb-4 flex items-center justify-center shadow-lg group-hover:scale-[1.02] transition-transform`}>
                            <span className="text-4xl">🎓</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>{course.completed}/{course.total} Lessons</span>
                            <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${course.color}`}
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                        <button className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium">
                            Continue Learning
                        </button>
                    </div>
                ))}
            </div>

            {/* Featured Video Mockup */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Featured Course</h2>
                <div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center border border-white/10">
                    <div className="text-center">
                        <div className="text-6xl mb-4 opacity-50">▶️</div>
                        <p className="text-gray-400">Select a course to start watching</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Learning;
