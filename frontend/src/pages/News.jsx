import React, { useEffect, useState } from 'react';
import { Calendar, Tag } from 'lucide-react';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/news')
            .then(res => res.json())
            .then(setNews)
            .catch(err => console.error("Failed to fetch news", err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8">Newsfeed</h2>

            <div className="space-y-6 relative before:absolute before:left-8 before:top-0 before:h-full before:w-0.5 before:bg-white/10">
                {news.map((item) => (
                    <div key={item.id} className="relative pl-20">
                        {/* Timeline Dot */}
                        <div className="absolute left-[27px] top-6 w-3 h-3 rounded-full bg-wf-cyan shadow-[0_0_10px_rgba(0,139,139,0.5)] z-10" />

                        <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.category === 'WF-TECH'
                                        ? 'bg-wf-cyan/10 text-wf-cyan border-wf-cyan/20'
                                        : 'bg-wf-purple/10 text-wf-purple border-wf-purple/20'
                                    }`}>
                                    {item.category}
                                </span>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Calendar size={14} />
                                    {item.date}
                                </div>
                            </div>

                            <h3 className="text-xl font-medium mb-2 group-hover:text-wf-cyan transition-colors">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
