import React, { useState } from 'react';
import rectangle from '../../assets/Rectangle.png';
import CreatePost from './CreatePost';

function Banner() {
    const [activeTab, setActiveTab] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const tabs = [
        { id: 'all', label: 'All Posts' },
        { id: 'discussions', label: 'Discussions' },
        { id: 'announcements', label: 'Announcements' },
    ];
    
    return (
        <div className="w-full">
            {/* Banner Image */}
            <img className="w-full" src={rectangle} alt="Banner" />

            {/* Tab Navigation & Action Buttons */}
            <div className="flex flex-col lg:flex-row w-full justify-between items-center px-6 py-4 mx-auto">
                {/* Tabs */}
                <div className="flex gap-6 text-base font-medium">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`transition-colors px-2 py-1 rounded-md hover:text-black hover:bg-gray-100 ${
                                activeTab === tab.id ? 'text-black font-semibold border-b-2 border-black' : 'text-gray-500'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-3 md:mt-0">
                    <button onClick={() => setIsModalOpen(true)} className=" md:flex items-center bg-gray-200 text-black px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition">
                        ✍ Write a Post
                    </button>
                    <button className=" md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                        ✨ Join Group
                    </button>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-600" />
            
            <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Banner;
