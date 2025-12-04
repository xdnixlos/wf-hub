import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const System = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/system/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, [token]);

    if (loading && !stats) {
        return <div className="p-8 text-white">Loading System Stats...</div>;
    }

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                System Monitor
            </h1>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-gray-400 mb-2">CPU Usage</h3>
                    <div className="text-4xl font-bold mb-4">{stats?.cpu || 0}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats?.cpu || 0}%` }}></div>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-gray-400 mb-2">RAM Usage</h3>
                    <div className="text-4xl font-bold mb-4">{stats?.ram || 0}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats?.ram || 0}%` }}></div>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-gray-400 mb-2">Disk Usage</h3>
                    <div className="text-4xl font-bold mb-4">{stats?.disk || 0}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats?.disk || 0}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Containers */}
            <h2 className="text-2xl font-bold mb-4">Containers</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">IP</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {stats?.containers?.map((container, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-sm">{container.id}</td>
                                <td className="p-4 font-bold">{container.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${container.status === 'running' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                        {container.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400">{container.ip}</td>
                            </tr>
                        ))}
                        {(!stats?.containers || stats.containers.length === 0) && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    No containers found or connection failed.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default System;
