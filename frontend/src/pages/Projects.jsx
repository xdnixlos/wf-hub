import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Plus, ChevronLeft, ChevronRight, User } from 'lucide-react';

const Projects = () => {
    const [columns, setColumns] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/projects')
            .then(res => res.json())
            .then(setColumns)
            .catch(err => console.error("Failed to fetch projects", err));
    }, []);

    const moveTask = (task, fromCol, toCol) => {
        const newColumns = { ...columns };
        // Remove from source
        newColumns[fromCol] = newColumns[fromCol].filter(t => t.id !== task.id);
        // Add to dest
        newColumns[toCol] = [...newColumns[toCol], task];
        setColumns(newColumns);
    };

    if (!columns) return <div className="text-gray-400">Loading Projects...</div>;

    const Column = ({ id, title, tasks, colorClass, prevCol, nextCol }) => (
        <div className="flex-1 min-w-[300px] flex flex-col h-full">
            <div className={`flex items-center justify-between mb-4 pb-2 border-b ${colorClass}`}>
                <h3 className="font-medium">{title}</h3>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{tasks.length}</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                {tasks.map((task) => (
                    <div key={task.id} className="glass-panel p-4 rounded-xl hover:-translate-y-1 transition-transform group relative">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{task.tag}</span>
                            <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                        </div>
                        <h4 className="font-medium mb-3">{task.title}</h4>

                        <div className="flex items-center justify-between mt-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-wf-cyan/20 border border-black flex items-center justify-center text-[10px] text-wf-cyan">A</div>
                                <div className="w-6 h-6 rounded-full bg-wf-purple/20 border border-black flex items-center justify-center text-[10px] text-wf-purple">J</div>
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {prevCol && (
                                    <button
                                        onClick={() => moveTask(task, id, prevCol)}
                                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                )}
                                {nextCol && (
                                    <button
                                        onClick={() => moveTask(task, id, nextCol)}
                                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-4 w-full py-2 rounded-lg border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <Plus size={16} />
                Add Task
            </button>
        </div>
    );

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <h2 className="text-2xl font-semibold mb-8">Projects Kanban</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 h-full">
                <Column
                    id="todo"
                    title="To Do"
                    tasks={columns.todo}
                    colorClass="border-gray-600"
                    nextCol="in_progress"
                />
                <Column
                    id="in_progress"
                    title="In Progress"
                    tasks={columns.in_progress}
                    colorClass="border-wf-cyan"
                    prevCol="todo"
                    nextCol="done"
                />
                <Column
                    id="done"
                    title="Done"
                    tasks={columns.done}
                    colorClass="border-green-500"
                    prevCol="in_progress"
                />
            </div>
        </div>
    );
};

export default Projects;
