'use client';

import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaImage,
  FaMicrophoneAlt,
  FaVideo,
  FaPaintBrush,
  FaRobot,
  FaBars
} from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

// Import the Sheet component from ShadCN
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home', path: '/' },
    { id: 'image', icon: FaImage, label: 'Image Captioning', path: '/image-caption' },
    { id: 'audio', icon: FaMicrophoneAlt, label: 'Audio Transcription', path: '/audio-transcription' },
    { id: 'video', icon: FaVideo, label: 'Video to Text', path: '/video-to-text' },
    { id: 'generate', icon: FaPaintBrush, label: 'Image Generator', path: '/image-generator' },
    { id: 'chatbot', icon: FaRobot, label: 'Chatbot', path: '/chatbot' },
  ];

  return (
    <div>
      <nav className="bg-[#111827] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">MediaGenix</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map(({ id, icon: Icon, label, path }) => (
                  <button
                    key={id}
                    onClick={() => handleClick(path)}
                    className={`
                      ${pathname === path
                        ? 'bg-gradient-to-r from-teal-500 to-blue-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                      px-3 py-2 rounded-md text-sm font-medium
                    `}
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
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="bg-gray-950 text-white">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {navItems.map(({ id, icon: Icon, label, path }) => (
              <button
                key={id}
                onClick={() => handleClick(path)}
                className={`
                  ${pathname === path
                    ? 'bg-gradient-to-r from-teal-500 to-blue-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  block px-3 py-2 rounded-md text-base font-medium w-full text-left
                `}
              >
                <Icon className="inline-block mr-2" size={16} />
                {label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
