import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-wf-bg text-white">
            <Sidebar />
            <main className="ml-64 p-8 min-h-screen relative overflow-hidden">
                {/* Background Ambient Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-wf-cyan/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-wf-purple/10 rounded-full blur-[120px]" />
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
