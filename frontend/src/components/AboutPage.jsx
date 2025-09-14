import React, { useState, useEffect } from 'react';
import { Camera, Youtube, GraduationCap, Briefcase, Star } from 'lucide-react';
import { mockData } from '../data/mockData';

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrolled / maxScroll) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'camera': return <Camera size={32} />;
      case 'youtube': return <Youtube size={32} />;
      case 'graduation': return <GraduationCap size={32} />;
      case 'briefcase': return <Briefcase size={32} />;
      case 'star': return <Star size={32} />;
      default: return <Camera size={32} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">My Journey</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A timeline of my evolution from camera enthusiast to professional videographer
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Progress Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-700 h-full">
          <div 
            className="w-full bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-24">
          {mockData.timeline.map((item, index) => (
            <div 
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 border-4 border-slate-900 rounded-full z-10 shadow-lg">
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-50"></div>
              </div>

              {/* Content Card */}
              <div 
                className={`w-5/12 ${
                  index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'
                } animate-on-scroll`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
                  {/* Year Badge */}
                  <div className="inline-flex items-center bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    {item.year}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center mb-4">
                    <div className="bg-slate-700 p-3 rounded-lg text-orange-400 mr-4">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-lg mb-4">
                    {item.description}
                  </p>

                  {/* Details */}
                  {item.details && (
                    <p className="text-orange-400 text-sm font-medium mb-6 italic">
                      {item.details}
                    </p>
                  )}

                  {/* Image Placeholder */}
                  <div className="bg-slate-700 rounded-xl border-2 border-dashed border-slate-600 h-48 flex items-center justify-center group hover:border-orange-500 transition-all duration-300">
                    <div className="text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                      <div className="mb-3">
                        {getIcon(item.icon)}
                      </div>
                      <p className="text-sm font-medium">Image Placeholder</p>
                      <p className="text-xs opacity-60">Replace with your photo</p>
                    </div>
                  </div>
                </div>

                {/* Arrow pointing to timeline */}
                <div 
                  className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
                    index % 2 === 0 
                      ? 'right-6 border-l-[15px] border-l-slate-800 border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent' 
                      : 'left-6 border-r-[15px] border-r-slate-800 border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent'
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline End */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full border-4 border-slate-900 shadow-lg">
          <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-30"></div>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl p-4 z-40">
        <div className="flex flex-col space-y-2">
          {mockData.timeline.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                const element = document.querySelectorAll('.animate-on-scroll')[index];
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="w-3 h-3 rounded-full bg-slate-600 hover:bg-orange-500 transition-colors duration-300 relative"
              title={item.title}
            >
              <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.year}
              </div>
            </button>
          ))}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-slate-400 text-xs text-center">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;