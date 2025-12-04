import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Files = () => {
    const { token } = useAuth();
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/files', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setFiles(data);
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8000/api/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                fetchFiles();
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                File Storage
            </h1>

            {/* Upload Zone */}
            <div className="mb-8 p-8 border-2 border-dashed border-gray-600 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
                <input
                    type="file"
                    onChange={handleUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={uploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="text-4xl mb-2">☁️</div>
                    <span className="text-lg font-medium">
                        {uploading ? 'Uploading...' : 'Click to Upload or Drag Files Here'}
                    </span>
                    <span className="text-sm text-gray-400 mt-1">Supports all file types</span>
                </label>
            </div>

            {/* File Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file, index) => (
                    <a
                        key={index}
                        href={`http://localhost:8000${file.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 flex flex-col items-center text-center"
                    >
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📄</div>
                        <span className="text-sm truncate w-full" title={file.name}>{file.name}</span>
                    </a>
                ))}
                {files.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        No files uploaded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Files;
