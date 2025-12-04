import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { token, user } = useAuth();
    const [news, setNews] = useState([]);
    const [showNewsModal, setShowNewsModal] = useState(false);

    // News Form
    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [newsCategory, setNewsCategory] = useState('WF-TECH');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/news', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setNews(data);
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        }
    };

    const handleCreateNews = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newsTitle,
                    content: newsContent,
                    category: newsCategory
                })
            });
            if (res.ok) {
                setShowNewsModal(false);
                setNewsTitle('');
                setNewsContent('');
                fetchNews();
            }
        } catch (error) {
            console.error("Failed to create news", error);
        }
    };

    return (
        <div className="p-8 text-white">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Welcome back, {user?.full_name || 'User'}
                    </h1>
                    <p className="text-gray-400 mt-2">Here is what's happening in the ecosystem.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowNewsModal(true)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-lg shadow-purple-500/20"
                    >
                        + Post News
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* News Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
                    {news.map((item) => (
                        <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30 mb-2 inline-block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                </div>
                                <span className="text-sm text-gray-500">{item.date}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {item.content}
                            </p>
                        </div>
                    ))}
                    {news.length === 0 && (
                        <div className="text-center text-gray-500 py-12 bg-white/5 rounded-2xl">
                            No news updates available.
                        </div>
                    )}
                </div>

                {/* Quick Stats / Widgets */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold mb-2">System Status</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span>All Systems Operational</span>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="/wiki" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                                📚 Wiki
                            </a>
                            <a href="/projects" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                                🚀 Projects
                            </a>
                            <a href="/files" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                                📂 Files
                            </a>
                            <a href="/system" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                                🖥️ System
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Modal */}
            {showNewsModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6">Post News Update</h2>
                        <form onSubmit={handleCreateNews} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    value={newsTitle}
                                    onChange={e => setNewsTitle(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Category</label>
                                <select
                                    value={newsCategory}
                                    onChange={e => setNewsCategory(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                                >
                                    <option value="WF-TECH">WF-TECH</option>
                                    <option value="DEV">DEV</option>
                                    <option value="ORG">ORG</option>
                                    <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Content</label>
                                <textarea
                                    value={newsContent}
                                    onChange={e => setNewsContent(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none h-32"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowNewsModal(false)}
                                    className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
                                >
                                    Post Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
