import React, { useState, useEffect } from 'react';
import { Send, ExternalLink, Activity, Cpu, HardDrive } from 'lucide-react';

const Dashboard = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-8">WF-HUB Mission Control</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Widget 1: Welcome & Time */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-wf-cyan">
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        {/* Smoke effect placeholder */}
                        <div className="w-32 h-32 bg-wf-cyan blur-[60px] rounded-full"></div>
                    </div>

                    <h3 className="text-xl font-medium mb-1">Welcome Admin</h3>
                    <p className="text-gray-400 text-sm mb-6">Current time as a amallan</p>

                    <div className="text-5xl font-bold mb-4 tracking-wider">
                        {formatTime(time)} <span className="text-lg text-gray-400 font-normal">AM</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-wf-red font-medium drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]">Glowred</span>
                    </div>
                </div>

                {/* Widget 2: AI Quick Assist */}
                <div className="glass-panel p-6 rounded-2xl relative border-t-2 border-t-wf-red/50 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-wf-red/5 to-transparent pointer-events-none" />

                    <div>
                        <h3 className="text-xl font-medium mb-2">AI Quick Assist</h3>
                        <p className="text-gray-400 text-sm mb-6">Frag your text and asteis alers.</p>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Frag Gemini..."
                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-wf-cyan/50 focus:ring-1 focus:ring-wf-cyan/50 transition-all"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-wf-cyan hover:text-white transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                </div>

                {/* Widget 3: System Health */}
                <div className="glass-panel p-6 rounded-2xl border-b-4 border-b-wf-cyan">
                    <h3 className="text-xl font-medium mb-6">System Health</h3>

                    <div className="flex justify-around items-center">
                        {/* CPU Gauge */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-400 text-sm mb-1">CPU</div>
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                                    <circle cx="48" cy="48" r="40" stroke="#4ade80" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="138" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                                </svg>
                                <span className="absolute text-xl font-bold">45%</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Hetzner</div>
                        </div>

                        {/* RAM Gauge */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-400 text-sm mb-1">RAM</div>
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                                    <circle cx="48" cy="48" r="40" stroke="#0ea5e9" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="75" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                                </svg>
                                <span className="absolute text-xl font-bold">70%</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Proxmox</div>
                        </div>
                    </div>
                </div>

                {/* Widget 4: Quick Links */}
                <div className="space-y-4">
                    {/* Link 1 */}
                    <a href="#" className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-all border-l-4 border-l-wf-cyan">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-wf-cyan/20 to-wf-cyan/5 flex items-center justify-center text-wf-cyan font-bold text-xl border border-wf-cyan/20">
                                WF
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">WF-TECH</div>
                                <div className="font-medium group-hover:text-wf-cyan transition-colors">Master-Mind Website</div>
                            </div>
                        </div>
                        <ExternalLink size={18} className="text-gray-500 group-hover:text-white" />
                    </a>

                    {/* Link 2 */}
                    <a href="#" className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-all border-l-4 border-l-wf-purple">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-wf-purple/20 to-wf-purple/5 flex items-center justify-center text-wf-purple font-bold text-xl border border-wf-purple/20">
                                JJ
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">JJ-TECH</div>
                                <div className="font-medium group-hover:text-wf-purple transition-colors">Partner Website</div>
                            </div>
                        </div>
                        <ExternalLink size={18} className="text-gray-500 group-hover:text-white" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
