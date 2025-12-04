import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import System from './pages/System';
import News from './pages/News';
import Projects from './pages/Projects';
import Wiki from './pages/Wiki';
import Settings from './pages/Settings';
import Chat from './pages/Chat';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="news" element={<News />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="wiki" element={<Wiki />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="monitor" element={<System />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
