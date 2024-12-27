import { Video, Image, Mic, Zap, Share2, BarChart } from 'lucide-react'

const features = [
  {
    title: "Video Processing",
    description: "Transform raw footage into polished videos with our AI-powered editing tools.",
    icon: Video,
    className: "md:col-span-2 md:row-span-2 bg-teal-900/30"
  },
  {
    title: "Image Enhancement",
    description: "Elevate your visuals with state-of-the-art AI image editing capabilities.",
    icon: Image,
    className: "bg-teal-800/30"
  },
  {
    title: "Audio Mastering",
    description: "Perfect your sound with advanced audio processing and noise reduction.",
    icon: Mic,
    className: "bg-teal-700/30"
  },
  {
    title: "Quick Rendering",
    description: "Experience lightning-fast content generation with our optimized rendering engine.",
    icon: Zap,
    className: "md:col-span-2 bg-teal-950/30"
  },
]

export default function BentoAbout() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Unleash Your Creative Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">MediaGenix</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.className} p-8 rounded-3xl bg-blue-900/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <feature.icon className="w-12 h-12 text-teal-400 mb-6 group-hover:text-teal-300 transition-colors duration-300" />
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-teal-400 group-hover:text-teal-300 transition-colors duration-300 text-2xl">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

