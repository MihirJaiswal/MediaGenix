'use client'; 
import React, { useState } from 'react'; 
import { FaHome, FaImage, FaMicrophoneAlt, FaVideo, FaPaintBrush } from 'react-icons/fa'; // Added FaPaintBrush for ImageGenerator icon
import Home from './Home';  
import Transcription from './Audio'; 
import ImageCaptioning from './Image'; 
import VideoToTextGenerator from './Video';
import ImageGenerator from './ImageGenerator'; // Import the ImageGenerator component

export default function AllComp() {   
  const [currentComponent, setCurrentComponent] = useState<'home' | 'image' | 'audio' | 'video' | 'generate'>('home'); // Added 'generate' to state

  const handleClick = (component: 'home' | 'image' | 'audio' | 'video' | 'generate') => {     
    setCurrentComponent(component);   
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 bg-gradient-to-b from-teal-950 via-gray-900 to-black ">
      {/* Sidebar */}
      <div className="fixed top-16 left-0 h-full w-28 bg-black border-r border-gray-500 flex flex-col items-center p-4 space-y-4">
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

        {/* Video Button */}
        <button
          onClick={() => handleClick('video')}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate focus:ring-offset-1 focus:ring-offset-slate-200"
        >
          <FaVideo size={20} />
        </button>

        {/* Image Generator Button */}
        <button
          onClick={() => handleClick('generate')}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate focus:ring-offset-1 focus:ring-offset-slate-200"
        >
          <FaPaintBrush size={20} />
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

        {/* Video Component */}
        {currentComponent === 'video' && <VideoToTextGenerator />}

        {/* Image Generator Component */}
        {currentComponent === 'generate' && <ImageGenerator />}
      </div>
    </div>
  );
}
