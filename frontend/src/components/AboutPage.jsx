import React, { useState, useEffect } from 'react';
import { Camera, Youtube, GraduationCap, Briefcase, Star } from 'lucide-react';
import { mockData } from '../data/mockData';

const AboutPage = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Update active timeline item based on scroll
      const timelineHeight = maxScroll / mockData.timeline.length;
      const newActiveItem = Math.min(
        Math.floor(scrolled / timelineHeight),
        mockData.timeline.length - 1
      );
      setActiveTimelineItem(newActiveItem);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'camera': return <Camera size={24} />;
      case 'youtube': return <Youtube size={24} />;
      case 'graduation': return <GraduationCap size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'star': return <Star size={24} />;
      default: return <Camera size={24} />;
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

      {/* Timeline Interface - Inspired by Video Editing Software */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          {/* Timeline Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-700">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h2 className="text-white font-semibold">Shortmedia Timeline.resolve</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 min-h-[600px]">
            {/* Timeline Panel */}
            <div className="lg:col-span-4 bg-slate-850 border-r border-slate-700">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-white font-semibold mb-2">Timeline</h3>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {mockData.timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeTimelineItem === index 
                        ? 'bg-orange-500/20 border-l-4 border-orange-500' 
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    onClick={() => setActiveTimelineItem(index)}
                  >
                    <div className={`p-2 rounded-lg ${
                      activeTimelineItem === index ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs">{item.year}</p>
                    </div>
                    {activeTimelineItem === index && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Viewer Panel */}
            <div className="lg:col-span-8 bg-slate-900">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-white font-semibold">Preview</h3>
              </div>

              <div className="p-8 h-full flex items-center justify-center">
                <div className="max-w-2xl w-full">
                  {/* Timeline Item Image Placeholder */}
                  <div className="bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600 h-64 flex items-center justify-center mb-6 group hover:border-orange-500 transition-all duration-300">
                    <div className="text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                      <div className="mb-4">
                        {getIcon(mockData.timeline[activeTimelineItem]?.icon)}
                      </div>
                      <p className="text-sm">Image Placeholder</p>
                      <p className="text-xs opacity-60">Replace with your photo/video thumbnail</p>
                    </div>
                  </div>

                  {/* Timeline Item Content */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {mockData.timeline[activeTimelineItem]?.title}
                    </h2>
                    <div className="text-orange-400 font-semibold mb-4">
                      {mockData.timeline[activeTimelineItem]?.year}
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {mockData.timeline[activeTimelineItem]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div className="bg-slate-900 p-4 border-t border-slate-700">
            <div className="flex items-center gap-4">
              <div className="text-slate-400 text-sm min-w-0">
                {String(activeTimelineItem + 1).padStart(2, '0')} / {String(mockData.timeline.length).padStart(2, '0')}
              </div>
              <div className="flex-1 bg-slate-700 rounded-full h-2 relative">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((activeTimelineItem + 1) / mockData.timeline.length) * 100}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full shadow-lg transition-all duration-300"
                  style={{ left: `${((activeTimelineItem + 1) / mockData.timeline.length) * 100}%`, marginLeft: '-8px' }}
                ></div>
              </div>
              <div className="text-slate-400 text-sm">
                {mockData.timeline[activeTimelineItem]?.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;