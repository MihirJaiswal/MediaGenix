'use client';

import React from 'react';
import { FaImage, FaMicrophoneAlt, FaVideo, FaPaintBrush } from 'react-icons/fa';
import Hero from './Hero';
import CTASection from './Cta';
import BentoAbout from './Aboutus';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 via-gray-900 to-black text-white">
      {/* Navbar */}
      
      <header className="w-full fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-500 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-400">MediaGenix</h1>
          <nav className="flex space-x-6">
            <a href="#features" className="hover:text-teal-300 transition">
              Features
            </a>
            <a href="#about" className="hover:text-teal-300 transition">
              About
            </a>
            <a href="#contact" className="hover:text-teal-300 transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="">
       <Hero/>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-teal-400">Features</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <FaImage size={40} className="text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Image Captioning</h3>
            <p className="text-gray-400 mt-2">Generate captions for your images effortlessly.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaMicrophoneAlt size={40} className="text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Audio Transcription</h3>
            <p className="text-gray-400 mt-2">Turn your audio recordings into text.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaVideo size={40} className="text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Video to Text</h3>
            <p className="text-gray-400 mt-2">Extract meaningful text from videos.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaPaintBrush size={40} className="text-teal-400" />
            <h3 className="mt-4 text-xl font-semibold">Image Generation</h3>
            <p className="text-gray-400 mt-2">Create beautiful images with AI assistance.</p>
          </div>
        </div>
      </section>
      <section>
        <BentoAbout/>
      </section>


      {/* Call to Action */}
      <section className="py-16 px-6">
        <CTASection/>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center">
        <p className="text-gray-500">© 2024 MediaGenix. All rights reserved.</p>
      </footer>
    </div>
  );
}
