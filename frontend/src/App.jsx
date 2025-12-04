import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import Wiki from './pages/Wiki';
import Projects from './pages/Projects';
import System from './pages/System';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Files from './pages/Files';
import Learning from './pages/Learning';
import Music from './pages/Music';
import Calendar from './pages/Calendar';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const AppLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                {children}
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Dashboard />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/wiki" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Wiki />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/projects" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Projects />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/system" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <System />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/chat" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Chat />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/files" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Files />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/learning" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Learning />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/music" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Music />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/calendar" element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Calendar />
                            </AppLayout>
                        </ProtectedRoute>
                    } />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
