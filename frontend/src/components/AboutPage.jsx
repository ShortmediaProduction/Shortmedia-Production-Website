import React, { useState, useEffect, useRef } from 'react';
import { Camera, Youtube, GraduationCap, Briefcase, Star } from 'lucide-react';
import { mockData } from '../data/mockData';

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [apertureOpen, setApertureOpen] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!canScroll) {
        // Aperture opening phase
        const scrolled = window.scrollY;
        const maxScroll = window.innerHeight * 0.8; // 80% of viewport height to fully open
        const progress = Math.min(scrolled / maxScroll, 1);
        setScrollProgress(progress);
        
        if (progress >= 1 && !apertureOpen) {
          setApertureOpen(true);
          setCanScroll(true);
          // Smooth transition to content scrolling
          setTimeout(() => {
            window.scrollTo(0, window.innerHeight);
          }, 500);
        }
      } else {
        // Normal content scrolling
        const scrolled = window.scrollY - window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight * 2;
        const progress = Math.max(0, Math.min((scrolled / maxScroll) * 100, 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Prevent normal scrolling initially
    if (!canScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [canScroll, apertureOpen]);

  // Enable scrolling for aperture animation
  useEffect(() => {
    if (!canScroll) {
      document.body.style.overflow = 'auto';
    }
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

  const apertureBladesStyle = {
    transform: `scaleY(${1 - scrollProgress})`,
    opacity: apertureOpen ? 0 : 1,
    transition: apertureOpen ? 'opacity 0.5s ease-out' : 'none'
  };

  const titleStyle = {
    opacity: scrollProgress,
    transform: `scale(${0.8 + (scrollProgress * 0.2)})`,
    transition: apertureOpen ? 'all 0.5s ease-out' : 'none'
  };

  return (
    <div className="min-h-screen bg-black" ref={containerRef}>
      {/* Aperture Header Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black"></div>
        
        {/* Aperture Blades */}
        {!apertureOpen && (
          <div className="absolute inset-0 z-20">
            {/* Top Blade */}
            <div 
              className="absolute top-0 left-0 right-0 bg-black origin-bottom"
              style={{
                height: '50%',
                ...apertureBladesStyle,
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
              }}
            ></div>
            
            {/* Bottom Blade */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-black origin-top"
              style={{
                height: '50%',
                ...apertureBladesStyle,
                clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)'
              }}
            ></div>
            
            {/* Left Blade */}
            <div 
              className="absolute top-0 bottom-0 left-0 bg-black origin-right"
              style={{
                width: '50%',
                ...apertureBladesStyle,
                clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0 100%)'
              }}
            ></div>
            
            {/* Right Blade */}
            <div 
              className="absolute top-0 bottom-0 right-0 bg-black origin-left"
              style={{
                width: '50%',
                ...apertureBladesStyle,
                clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 90%)'
              }}
            ></div>

            {/* Diagonal Blades */}
            <div 
              className="absolute inset-0 bg-black origin-bottom-right"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(0 0, 70% 0, 0 70%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-black origin-bottom-left"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(30% 0, 100% 0, 100% 70%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-black origin-top-right"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(0 30%, 70% 100%, 0 100%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-black origin-top-left"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(30% 100%, 100% 30%, 100% 100%)'
              }}
            ></div>
          </div>
        )}

        {/* Header Content - Revealed by Aperture */}
        <div className="text-center z-10 px-6" style={titleStyle}>
          <div className="mb-8">
            <span className="text-orange-400 font-mono text-sm tracking-wider uppercase">
              Behind the Lens
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              My
            </span>
            <br />
            <span className="text-white">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From the first click to cinematic storytelling
          </p>
        </div>

        {/* Aperture Progress Indicator */}
        {!apertureOpen && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex flex-col items-center text-white">
              <div className="w-16 h-16 border-2 border-orange-400 rounded-full flex items-center justify-center mb-4">
                <div 
                  className="w-12 h-12 bg-orange-400 rounded-full transition-transform duration-100"
                  style={{ transform: `scale(${scrollProgress})` }}
                ></div>
              </div>
              <span className="text-sm font-mono tracking-wider uppercase">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Eras Content - Only visible after aperture opens */}
      {apertureOpen && (
        <div className="min-h-screen">
          {/* Era Sections */}
          <div className="max-w-6xl mx-auto px-6 space-y-32 py-20">
            {mockData.timeline.map((era, index) => (
              <section 
                key={index} 
                className={`flex items-center min-h-screen ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 p-12">
                  {/* Era Content */}
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12">
                    <div className="flex items-center mb-6">
                      <div className="text-orange-400 mr-4">
                        {getIcon(era.icon)}
                      </div>
                      <span className="text-orange-400 font-mono text-sm tracking-wider uppercase">
                        {era.year}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl font-bold text-white mb-6">
                      {era.title}
                    </h2>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {era.description}
                    </p>
                    
                    {era.details && (
                      <p className="text-orange-400 font-medium italic">
                        {era.details}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="w-1/2 p-12">
                  {/* Era Image Placeholder */}
                  <div className="aspect-square bg-slate-800 rounded-3xl border-2 border-dashed border-slate-600 flex items-center justify-center group hover:border-orange-500 transition-all duration-300">
                    <div className="text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                      <div className="mb-4">
                        {getIcon(era.icon)}
                      </div>
                      <p className="text-lg font-medium">{era.title}</p>
                      <p className="text-sm opacity-60">Era Image Placeholder</p>
                      <p className="text-xs opacity-40 mt-2">Replace with your photo</p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Final Section */}
          <section className="py-20 bg-gradient-to-b from-black to-slate-900">
            <div className="max-w-4xl mx-auto text-center px-6">
              <h2 className="text-4xl font-bold text-white mb-6">The Journey Continues</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Every frame tells a story, every project teaches something new. 
                This is just the beginning of what's possible when passion meets purpose.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AboutPage;