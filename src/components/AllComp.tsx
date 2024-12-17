'use client';
import React, { useState } from 'react';
import { FaHome, FaImage, FaMicrophoneAlt } from 'react-icons/fa'; // Importing icons from React Icons
import Home from './Home';  // Assuming you have a Home component
import Transcription from './Audio';
import ImageCaptioning from './Image';

export default function AllComp() {
  const [currentComponent, setCurrentComponent] = useState<'home' | 'image' | 'audio'>('home');

  const handleClick = (component: 'home' | 'image' | 'audio') => {
    setCurrentComponent(component);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 bg-gradient-to-b from-teal-950 via-gray-900 to-black">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-28 bg-black border-r border-gray-500 flex flex-col items-center p-4 space-y-4">
        {/* Home Button */}
        <button
          onClick={() => handleClick('home')}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate focus:ring-offset-1 focus:ring-offset-slate-200"
        >
          <FaHome size={20} />
        </button>

        {/* Image Button */}
        <button
          onClick={() => handleClick('image')}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate focus:ring-offset-1 focus:ring-offset-slate-200"
        >
          <FaImage size={20} />
        </button>

        {/* Audio Button */}
        <button
          onClick={() => handleClick('audio')}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate focus:ring-offset-1 focus:ring-offset-slate-200"
        >
          <FaMicrophoneAlt size={20} />
        </button>
      </div>

      {/* Component Container */}
      <div className="ml-20 p-6 space-y-6">
        {/* Home Component */}
        {currentComponent === 'home' && <Home />}

        {/* Image Captioning Component */}
        {currentComponent === 'image' && <ImageCaptioning />}

        {/* Audio Transcription Component */}
        {currentComponent === 'audio' && <Transcription />}
      </div>
    </div>
  );
}
