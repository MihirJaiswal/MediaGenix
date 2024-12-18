import { ArrowRight, Video, Image, Mic } from "lucide-react";

export default function Hero() {
  return (
    <section className=" text-white ml-36">
      {/* Teal gradient background */}
      <div className="opacity-50 -z-10"></div>

      {/* Geometric shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob -z-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 -z-10"></div>

      {/* Content Container */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12">
        {/* Text content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transform Your Content with{" "}
            <span className="text-teal-400">MediaGenix</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Your all-in-one tool for generating captivating content from audio,
            video, and images. Create stunning visual stories and bring your
            ideas to life with ease.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Visual element */}
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 bg-teal-800 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <Video className="text-teal-400 w-16 h-16" />
                <Image className="text-teal-400 w-16 h-16" />
                <Mic className="text-teal-400 w-16 h-16" />
                <div className="w-16 h-16 bg-teal-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
