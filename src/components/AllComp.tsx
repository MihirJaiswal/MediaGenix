'use client';

import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaImage,
  FaMicrophoneAlt,
  FaVideo,
  FaPaintBrush,
  FaRobot,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Home from './Home';
import Transcription from './Audio';
import ImageCaptioning from './Image';
import VideoToTextGenerator from './Video';
import ImageGenerator from './ImageGenerator';
import Chatbot from './ChatBot';

// Import the Sheet component from ShadCN
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

type ComponentType = 'home' | 'image' | 'audio' | 'video' | 'generate' | 'chatbot';

export default function AllComp() {
  const [currentComponent, setCurrentComponent] = useState<ComponentType>('home');
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleClick = (component: ComponentType) => {
    setCurrentComponent(component);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'image', icon: FaImage, label: 'Image Captioning' },
    { id: 'audio', icon: FaMicrophoneAlt, label: 'Audio Transcription' },
    { id: 'video', icon: FaVideo, label: 'Video to Text' },
    { id: 'generate', icon: FaPaintBrush, label: 'Image Generator' },
    { id: 'chatbot', icon: FaRobot, label: 'Chatbot' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-teal-500">MediaGenix</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => handleClick(id as ComponentType)}
                    className={`
                      ${currentComponent === id
                        ? 'bg-gradient-to-r from-teal-500 to-blue-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                      px-3 py-2 rounded-md text-sm font-medium
                    `}
                    aria-current={currentComponent === id ? 'page' : undefined}
                  >
                    <Icon className="inline-block mr-2" size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <FaBars size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sheet Menu for Mobile */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="bg-gray-950 text-white">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleClick(id as ComponentType)}
                className={`
                  ${currentComponent === id
                    ? 'bg-gradient-to-r from-teal-500 to-blue-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  block px-3 py-2 rounded-md text-base font-medium w-full text-left
                `}
                aria-current={currentComponent === id ? 'page' : undefined}
              >
                <Icon className="inline-block mr-2" size={16} />
                {label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="min-h-screen bg-grid-white/[0.1]  relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center bg-gradient-to-br from-teal-900 via-blue-950 to-black justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
     <div className='relative'>
     {currentComponent === 'home' && <Home />}
        {currentComponent === 'image' && <ImageCaptioning />}
        {currentComponent === 'audio' && <Transcription />}
        {currentComponent === 'video' && <VideoToTextGenerator />}
        {currentComponent === 'generate' && <ImageGenerator />}
        {currentComponent === 'chatbot' && <Chatbot />}
     </div> 
    </div>
    <footer className="py-8 bg-black text-center">
        <p className="text-gray-500">© 2024 MediaGenix. All rights reserved.</p>
      </footer>
    </div>
  );
}
