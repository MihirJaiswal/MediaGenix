import { ArrowRight, Video, Image, Mic, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden  py-20 flex items-center justify-center">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-teal/[0.05] -z-10" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/50 via-gray-900/50 to-teal-900/50 backdrop-blur-sm -z-10" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-conic from-teal-900 via-gray-900 to-teal-900 animate-spin-slow opacity-30 -z-10" />

      {/* Geometric shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob -z-10 "></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 -z-10"></div>

      {/* Content Container */}
      <div className="container mx-auto max-w-7xl px-6 py-12 flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-12 relative">
        {/* Text content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Transform Your Content with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-gradient-x">
              MediaGenix
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Your all-in-one tool for generating captivating content from audio,
            video, and images. Create stunning visual stories and bring your
            ideas to life with ease.
          </p>
          <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Visual element */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-blue-800 rounded-full opacity-20"></div>
            <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="bg-gradient-to-br from-teal-800 to-blue-800 p-4 rounded-2xl transform transition-transform hover:scale-110 hover:shadow-glow">
                  <Video className="text-teal-400 w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <div className="bg-gradient-to-br from-teal-800 to-blue-800 p-4 rounded-2xl transform transition-transform hover:scale-110 hover:shadow-glow">
                  <Image className="text-teal-400 w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <div className="bg-gradient-to-br from-teal-800 to-blue-800 p-4 rounded-2xl transform transition-transform hover:scale-110 hover:shadow-glow">
                  <Mic className="text-teal-400 w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <div className="bg-gradient-to-br from-teal-800 to-blue-800 p-4 rounded-2xl transform transition-transform hover:scale-110 hover:shadow-glow">
                  <Sparkles className="text-teal-400 w-12 h-12 sm:w-16 sm:h-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

