
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNjgwODAiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block mb-4">
          <Sparkles className="text-teal-400 w-10 h-10 animate-pulse" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Elevate Your Content Creation
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Start Your Journey Today
          </span>
        </h2>
        <p className="mt-4 text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Unlock the power of MediaGenix and discover the tools you need to create outstanding content. Sign up now and transform your ideas into reality!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold py-3 px-8 rounded-full inline-flex items-center transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Sign Up Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button  className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-gray-900 font-bold py-3 px-8 rounded-full inline-flex items-center transition duration-300 text-lg">
            Learn More
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
    </section>
  )
}

