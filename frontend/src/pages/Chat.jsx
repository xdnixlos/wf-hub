import React, { useState } from 'react';
import { Send, Bot, User, Hash, MessageSquare, Plus } from 'lucide-react';

const Chat = () => {
    const [activeChannel, setActiveChannel] = useState({ id: 'ai', type: 'ai', name: 'Gemini Assistant' });
    const [input, setInput] = useState('');

    // Mock Data for Channels
    const channels = {
        ai: { id: 'ai', type: 'ai', name: 'Gemini Assistant', icon: Bot },
        rooms: [
            { id: 'general', type: 'room', name: 'general' },
            { id: 'development', type: 'room', name: 'development' },
            { id: 'alerts', type: 'room', name: 'alerts' },
        ],
        dms: [
            { id: 'admin', type: 'dm', name: 'WF-Admin' },
            { id: 'jj', type: 'dm', name: 'JJ-User' },
        ]
    };

    // Mock Messages per Channel
    const [messages, setMessages] = useState({
        ai: [
            { id: 1, sender: 'ai', text: 'Hello! I am your WF-HUB Assistant. How can I help you with the infrastructure today?' }
        ],
        general: [
            { id: 1, sender: 'WF-Admin', text: 'Welcome to the new dashboard!' },
            { id: 2, sender: 'JJ-User', text: 'Looks great! Love the glass effect.' }
        ],
        development: [
            { id: 1, sender: 'WF-Admin', text: 'Deployed the new API endpoints.' }
        ],
        alerts: [],
        admin: [],
        jj: []
    });

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'Me', text: input };

        setMessages(prev => ({
            ...prev,
            [activeChannel.id]: [...(prev[activeChannel.id] || []), userMsg]
        }));

        setInput('');

        // Mock AI Response
        if (activeChannel.type === 'ai') {
            setTimeout(() => {
                const aiMsg = { id: Date.now() + 1, sender: 'ai', text: `I received your command: "${userMsg.text}". I cannot execute it yet, but I'm learning!` };
                setMessages(prev => ({
                    ...prev,
                    [activeChannel.id]: [...prev[activeChannel.id], aiMsg]
                }));
            }, 1000);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6">
            {/* Secondary Sidebar */}
            <div className="w-64 glass-panel rounded-2xl flex flex-col p-4">
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">AI Assistant</h3>
                    <button
                        onClick={() => setActiveChannel(channels.ai)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeChannel.id === 'ai' ? 'bg-wf-cyan/20 text-wf-cyan' : 'text-gray-400 hover:bg-white/5'
                            }`}
                    >
                        <Bot size={18} />
                        <span className="font-medium">Gemini</span>
                    </button>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rooms</h3>
                        <Plus size={14} className="text-gray-500 cursor-pointer hover:text-white" />
                    </div>
                    <div className="space-y-1">
                        {channels.rooms.map(room => (
                            <button
                                key={room.id}
                                onClick={() => setActiveChannel(room)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeChannel.id === room.id ? 'bg-wf-purple/20 text-wf-purple' : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                <Hash size={18} />
                                <span className="font-medium">{room.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Direct Messages</h3>
                        <Plus size={14} className="text-gray-500 cursor-pointer hover:text-white" />
                    </div>
                    <div className="space-y-1">
                        {channels.dms.map(dm => (
                            <button
                                key={dm.id}
                                onClick={() => setActiveChannel(dm)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeChannel.id === dm.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                <div className="relative">
                                    <User size={18} />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-black" />
                                </div>
                                <span className="font-medium">{dm.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeChannel.type === 'ai' ? 'bg-gradient-to-br from-wf-cyan to-wf-purple' : 'bg-white/10'
                        }`}>
                        {activeChannel.type === 'ai' ? <Bot className="text-white" size={20} /> : <Hash className="text-gray-300" size={20} />}
                    </div>
                    <div>
                        <h3 className="font-medium">{activeChannel.name}</h3>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                            {activeChannel.type === 'ai' ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-green-400" /> Online
                                </>
                            ) : (
                                <span>{messages[activeChannel.id]?.length || 0} messages</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {(messages[activeChannel.id] || []).map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.sender === 'Me' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-wf-cyan/20 text-wf-cyan' :
                                    msg.sender === 'Me' ? 'bg-wf-purple/20 text-wf-purple' : 'bg-gray-700 text-gray-300'
                                }`}>
                                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.sender === 'ai'
                                    ? 'bg-white/5 border border-white/10 rounded-tl-none'
                                    : msg.sender === 'Me'
                                        ? 'bg-wf-purple/20 text-white border border-wf-purple/30 rounded-tr-none'
                                        : 'bg-white/10 text-white rounded-tl-none'
                                }`}>
                                {msg.sender !== 'Me' && msg.sender !== 'ai' && <div className="text-xs text-gray-400 mb-1">{msg.sender}</div>}
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Message ${activeChannel.name}...`}
                            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-wf-cyan/50"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-wf-cyan hover:text-white transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
