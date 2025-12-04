import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
    const { token } = useAuth();
    const [tasks, setTasks] = useState({ todo: [], inprogress: [], done: [] });
    const [showModal, setShowModal] = useState(false);

    // New Task Form
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskTag, setNewTaskTag] = useState('Backend');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/projects', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/projects/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newTaskTitle,
                    tag: newTaskTag,
                    status: 'todo'
                })
            });
            if (res.ok) {
                setShowModal(false);
                setNewTaskTitle('');
                fetchTasks();
            }
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    const handleMoveTask = async (taskId, newStatus, currentTitle) => {
        try {
            const res = await fetch(`http://localhost:8000/api/projects/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: newStatus,
                    title: currentTitle // Required by model but unchanged
                })
            });
            if (res.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error("Failed to move task", error);
        }
    };

    const Column = ({ title, items, status, color }) => (
        <div className="flex-1 min-w-[300px] bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col">
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${color}`}>
                <div className={`w-3 h-3 rounded-full ${color.replace('text-', 'bg-')}`}></div>
                {title} <span className="text-gray-500 text-sm ml-auto">{items.length}</span>
            </h3>
            <div className="space-y-3 flex-1 overflow-y-auto">
                {items.map(task => (
                    <div key={task.id} className="bg-gray-800/50 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">{task.tag}</span>
                            {/* Simple Move Controls */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {status !== 'todo' && (
                                    <button onClick={() => handleMoveTask(task.id, 'todo', task.title)} className="text-xs hover:text-blue-400">←</button>
                                )}
                                {status !== 'inprogress' && (
                                    <button onClick={() => handleMoveTask(task.id, 'inprogress', task.title)} className="text-xs hover:text-yellow-400">In Prog</button>
                                )}
                                {status !== 'done' && (
                                    <button onClick={() => handleMoveTask(task.id, 'done', task.title)} className="text-xs hover:text-green-400">→</button>
                                )}
                            </div>
                        </div>
                        <p className="font-medium text-gray-200">{task.title}</p>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                                {task.assignee_id ? 'U' : '?'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-8 text-white h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                    Project Board
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-lg shadow-orange-500/20"
                >
                    + Add Task
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 h-full">
                <Column title="To Do" items={tasks.todo} status="todo" color="text-blue-400" />
                <Column title="In Progress" items={tasks.inprogress} status="inprogress" color="text-yellow-400" />
                <Column title="Done" items={tasks.done} status="done" color="text-green-400" />
            </div>

            {/* Add Task Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    value={newTaskTitle}
                                    onChange={e => setNewTaskTitle(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-orange-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Tag</label>
                                <select
                                    value={newTaskTag}
                                    onChange={e => setNewTaskTag(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-orange-500 outline-none text-white"
                                >
                                    <option value="Backend">Backend</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Design">Design</option>
                                    <option value="DevOps">DevOps</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
