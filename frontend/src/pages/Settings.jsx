import React from 'react';
import { User, Bell, Monitor, Shield } from 'lucide-react';

const Settings = () => {
    const Section = ({ title, icon: Icon, children }) => (
        <div className="glass-panel p-6 rounded-2xl mb-6">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Icon className="text-wf-cyan" />
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            {children}
        </div>
    );

    const Toggle = ({ label, checked = false }) => (
        <div className="flex items-center justify-between py-3">
            <span className="text-gray-300">{label}</span>
            <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${checked ? 'bg-wf-cyan' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8">Settings</h2>

            <Section title="Profile Settings" icon={User}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Display Name</label>
                        <input type="text" defaultValue="Admin User" className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-wf-cyan/50 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Email</label>
                        <input type="email" defaultValue="admin@wf-group.com" className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-wf-cyan/50 focus:outline-none" />
                    </div>
                </div>
            </Section>

            <Section title="Notifications" icon={Bell}>
                <Toggle label="Email Notifications" checked={true} />
                <Toggle label="System Alerts" checked={true} />
                <Toggle label="Marketing Updates" checked={false} />
            </Section>

            <Section title="Dashboard Config" icon={Monitor}>
                <Toggle label="Show Seconds in Clock" checked={true} />
                <Toggle label="Animated Background" checked={true} />
                <div className="mt-4">
                    <label className="block text-xs text-gray-400 mb-1">Refresh Rate (System Stats)</label>
                    <select className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-wf-cyan/50 focus:outline-none">
                        <option>5 Seconds</option>
                        <option>10 Seconds</option>
                        <option>30 Seconds</option>
                    </select>
                </div>
            </Section>
        </div>
    );
};

export default Settings;
