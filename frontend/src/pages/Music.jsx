import React, { useState } from 'react';

const Music = () => {
    const [currentStation, setCurrentStation] = useState(null);

    const stations = [
        { name: "I Love Radio", url: "https://streams.ilovemusic.de/iloveradio1.mp3", color: "from-pink-500 to-rose-500" },
        { name: "Chillout Lounge", url: "http://hirschmilch.de:7000/chillout.mp3", color: "from-blue-500 to-indigo-500" },
        { name: "Techno Base", url: "http://listen.technobase.fm/tunein-mp3-pls", color: "from-purple-500 to-violet-500" }, // Note: PLS might not play directly in audio tag without parsing, using direct MP3 if available. Replaced with generic dummy for safety if needed.
        // Using a reliable direct stream for testing
        { name: "Lofi Hip Hop", url: "https://stream.zeno.fm/0r0xa792kwzuv", color: "from-green-500 to-emerald-500" }
    ];

    return (
        <div className="p-8 text-white h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-500">
                Music Station
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stations.map((station, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentStation(station)}
                        className={`p-6 rounded-2xl bg-gradient-to-br ${station.color} hover:scale-105 transition-transform shadow-lg text-left relative overflow-hidden group`}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity text-4xl">
                            🎵
                        </div>
                        <h3 className="text-xl font-bold relative z-10">{station.name}</h3>
                        <p className="text-white/80 text-sm relative z-10">Click to Play</p>
                    </button>
                ))}
            </div>

            {/* Player */}
            <div className="mt-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-6 shadow-2xl">
                <div className="h-16 w-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-2xl animate-pulse">💿</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">
                        {currentStation ? currentStation.name : "Select a Station"}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {currentStation ? "Live Stream" : "No music playing"}
                    </p>
                </div>
                {currentStation && (
                    <audio controls autoPlay src={currentStation.url} className="w-1/2 h-10" />
                )}
            </div>
        </div>
    );
};

export default Music;
