import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Wiki = () => {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showCreator, setShowCreator] = useState(false);

    // Creator State
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        fetchStructure();
    }, []);

    const fetchStructure = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/wiki/structure', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch wiki structure", error);
        }
    };

    const fetchArticle = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/api/wiki/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedArticle(data);
            }
        } catch (error) {
            console.error("Failed to fetch article", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/wiki', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newTitle,
                    category: newCategory,
                    content: newContent
                })
            });
            if (res.ok) {
                setShowCreator(false);
                setNewTitle('');
                setNewCategory('');
                setNewContent('');
                fetchStructure();
            }
        } catch (error) {
            console.error("Failed to create article", error);
        }
    };

    return (
        <div className="p-8 text-white h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    Knowledge Base
                </h1>
                <button
                    onClick={() => setShowCreator(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                    + New Article
                </button>
            </div>

            <div className="flex gap-8 flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/4 overflow-y-auto pr-4 border-r border-white/10">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="mb-6">
                            <h3 className="text-lg font-bold text-gray-400 mb-3 uppercase tracking-wider text-xs">
                                {cat.category}
                            </h3>
                            <ul className="space-y-2">
                                {cat.articles.map(article => (
                                    <li key={article.id}>
                                        <button
                                            onClick={() => fetchArticle(article.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${selectedArticle?.id === article.id ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'hover:bg-white/5 text-gray-300'}`}
                                        >
                                            {article.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-white/5 rounded-2xl p-8 border border-white/10">
                    {selectedArticle ? (
                        <article className="prose prose-invert max-w-none">
                            <h1 className="text-4xl font-bold mb-4">{selectedArticle.title}</h1>
                            <div className="flex gap-2 mb-8">
                                <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{selectedArticle.category}</span>
                            </div>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {selectedArticle.content}
                            </div>
                        </article>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <div className="text-6xl mb-4">📚</div>
                            <p>Select an article to start reading</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Creator Modal */}
            {showCreator && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Category</label>
                                <input
                                    value={newCategory}
                                    onChange={e => setNewCategory(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                    required
                                    list="categories"
                                />
                                <datalist id="categories">
                                    {categories.map(c => <option key={c.category} value={c.category} />)}
                                </datalist>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Content</label>
                                <textarea
                                    value={newContent}
                                    onChange={e => setNewContent(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none h-64"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreator(false)}
                                    className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                                >
                                    Create Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wiki;
