import React, { useEffect, useState } from 'react';
import { Activity, Server, HardDrive, Clock } from 'lucide-react';

const System = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/system/stats')
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Failed to fetch system stats", err));
    }, []);

    if (!data) return <div className="text-gray-400">Loading System Data...</div>;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold">System Monitor</h2>

            {/* Top Stats - Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hetzner Node */}
                <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-wf-cyan">
                    <div className="flex items-center gap-3 mb-6">
                        <Server className="text-wf-cyan" />
                        <h3 className="text-lg font-medium">Hetzner Root</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">CPU Load</div>
                            <div className="text-2xl font-bold text-wf-cyan">{data.hetzner.cpu}%</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">RAM Usage</div>
                            <div className="text-2xl font-bold text-wf-cyan">{data.hetzner.ram}%</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">Disk I/O</div>
                            <div className="text-lg font-medium">{data.hetzner.disk_io}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">Uptime</div>
                            <div className="text-lg font-medium">{data.hetzner.uptime}</div>
                        </div>
                    </div>
                </div>

                {/* Proxmox Cluster */}
                <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-wf-purple">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-wf-purple" />
                        <h3 className="text-lg font-medium">Proxmox Cluster</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">CPU Load</div>
                            <div className="text-2xl font-bold text-wf-purple">{data.proxmox.cpu}%</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">RAM Usage</div>
                            <div className="text-2xl font-bold text-wf-purple">{data.proxmox.ram}%</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">Disk I/O</div>
                            <div className="text-lg font-medium">{data.proxmox.disk_io}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl text-center">
                            <div className="text-gray-400 text-xs mb-1">Uptime</div>
                            <div className="text-lg font-medium">{data.proxmox.uptime}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LXC Containers Table */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-medium mb-4">LXC Containers</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 border-b border-white/10">
                                <th className="p-3 font-normal">ID</th>
                                <th className="p-3 font-normal">Name</th>
                                <th className="p-3 font-normal">IP Address</th>
                                <th className="p-3 font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.containers.map((container) => (
                                <tr key={container.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-3 text-gray-400">#{container.id}</td>
                                    <td className="p-3 font-medium">{container.name}</td>
                                    <td className="p-3 text-gray-400 font-mono text-sm">{container.ip}</td>
                                    <td className="p-3">
                                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${container.status === 'running'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${container.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                                                }`} />
                                            {container.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default System;
