import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, FileText, Folder, Plus, X } from 'lucide-react';

const Wiki = () => {
    const [structure, setStructure] = useState([]);
    const [activeArticle, setActiveArticle] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/wiki/structure')
            .then(res => res.json())
            .then(data => {
                setStructure(data);
                if (data.length > 0 && data[0].articles.length > 0) {
                    setActiveArticle(data[0].articles[0]);
                }
            })
            .catch(err => console.error("Failed to fetch wiki", err));
    }, []);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Wissen & Wiki</h2>
                <div className="flex gap-4">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search knowledge base..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:border-wf-cyan/50"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-wf-cyan/20 hover:bg-wf-cyan/30 text-wf-cyan border border-wf-cyan/50 px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,139,139,0.2)]"
                    >
                        <Plus size={18} />
                        New Article
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 glass-panel rounded-xl p-4 overflow-y-auto">
                    {structure.map((category, idx) => (
                        <div key={idx} className="mb-6">
                            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2 px-2">
                                <Folder size={14} />
                                {category.category}
                            </div>
                            <div className="space-y-1">
                                {category.articles.map((article) => (
                                    <button
                                        key={article}
                                        onClick={() => setActiveArticle(article)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${activeArticle === article
                                                ? 'bg-wf-cyan/10 text-wf-cyan'
                                                : 'text-gray-300 hover:bg-white/5'
                                            }`}
                                    >
                                        <FileText size={14} />
                                        {article}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 glass-panel rounded-xl p-8 overflow-y-auto">
                    {activeArticle ? (
                        <div className="max-w-3xl">
                            <h1 className="text-3xl font-bold mb-6">{activeArticle}</h1>
                            <div className="prose prose-invert prose-lg">
                                <p className="text-gray-300">
                                    This is a placeholder content for the article <strong>{activeArticle}</strong>.
                                    In a real application, this would be fetched from a markdown file or database.
                                </p>
                                <h3 className="text-xl font-medium mt-8 mb-4">Introduction</h3>
                                <p className="text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <div className="bg-white/5 border-l-4 border-wf-cyan p-4 my-6 rounded-r-lg">
                                    <p className="text-sm italic text-gray-300">
                                        "Knowledge is power. Sharing knowledge is the key to unlocking that power."
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Select an article to view content
                        </div>
                    )}
                </div>
            </div>

            {/* Create Article Modal */}
            {showModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="glass-panel w-[500px] p-6 rounded-2xl shadow-2xl border border-white/20">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Create New Article</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input type="text" placeholder="Article Title" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-wf-cyan/50 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Category</label>
                                <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-wf-cyan/50 focus:outline-none">
                                    <option>Infrastructure</option>
                                    <option>Development</option>
                                    <option>Onboarding</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Content</label>
                                <textarea rows="5" placeholder="Write your content here..." className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-wf-cyan/50 focus:outline-none resize-none"></textarea>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 transition-colors">Cancel</button>
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-wf-cyan text-white hover:bg-wf-cyan/80 transition-colors shadow-lg shadow-wf-cyan/20">Create Article</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wiki;
