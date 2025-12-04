import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, MessageSquare, BookOpen, Folder, Activity, Settings } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Newsfeed', icon: Newspaper, path: '/news' },
        { name: 'Chat & AI', icon: MessageSquare, path: '/chat' },
        { name: 'Wissen & Wiki', icon: BookOpen, path: '/wiki' },
        { name: 'Projekte', icon: Folder, path: '/projects' },
        { name: 'System Monitor', icon: Activity, path: '/monitor' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-wf-bg border-r border-white/10 flex flex-col p-4 fixed left-0 top-0 z-50">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-wf-cyan to-wf-purple flex items-center justify-center text-white font-bold">
                    WF
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    WF-Group
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                ? 'bg-wf-cyan/10 text-wf-cyan border border-wf-cyan/20 shadow-[0_0_15px_rgba(0,139,139,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
