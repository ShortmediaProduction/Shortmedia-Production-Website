import React, { useState, useEffect, useRef } from 'react';
import { Camera, Youtube, GraduationCap, Star, Play, ChevronDown, Zap, Award, Heart, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconType, size = 48) => {
    switch (iconType) {
      case 'camera': return <Camera size={size} className="text-white" />;
      case 'youtube': return <Youtube size={size} className="text-white" />;
      case 'graduation': return <GraduationCap size={size} className="text-white" />;
      case 'star': return <Star size={size} className="text-white" />;
      default: return <Camera size={size} className="text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div 
            className="transform transition-all duration-1000 delay-200"
            data-animate
            id="hero-badge"
          >
            <span className="inline-block px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-mono text-sm tracking-wider uppercase mb-8">
              <Camera size={16} className="inline mr-2" />
              Behind Every Frame
            </span>
          </div>
          
          <h1 
            className={`text-6xl md:text-8xl font-bold mb-8 tracking-tight transform transition-all duration-1000 delay-400 ${
              isVisible['hero-badge'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="bg-gradient-to-r from-white via-orange-300 to-orange-500 bg-clip-text text-transparent">
              My Creative
            </span>
            <br />
            <span className="text-white">Journey</span>
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-600 ${
              isVisible['hero-badge'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            From the first camera click to founding Shortmedia - explore the passion, 
            milestones, and creative evolution that shaped my videography career.
          </p>

          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 transform transition-all duration-1000 delay-800 ${
              isVisible['hero-badge'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-orange-400 mb-2 group-hover:text-orange-300">2013</div>
              <div className="text-slate-400 text-sm">Journey Started</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:text-purple-300">11+</div>
              <div className="text-slate-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-green-400 mb-2 group-hover:text-green-300">50+</div>
              <div className="text-slate-400 text-sm">Projects</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:text-blue-300">∞</div>
              <div className="text-slate-400 text-sm">Passion</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-orange-400 cursor-pointer hover:text-orange-300 transition-colors">
            <ChevronDown size={32} className="mb-2" />
            <span className="text-xs font-mono tracking-wider uppercase">Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* Timeline Sections */}
      <div className="relative bg-slate-900">
        {mockData.timeline.map((era, index) => (
          <section
            key={index}
            id={`era-${index}`}
            data-animate
            className="min-h-screen flex items-center py-20 relative"
          >
            {/* Background Gradient */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: index % 2 === 0 
                  ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                  : 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
              }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 0 ? '' : 'lg:grid-cols-2'
              }`}>
                
                {/* Content Side */}
                <div 
                  className={`space-y-8 transform transition-all duration-1000 delay-200 ${
                    index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                  } ${
                    isVisible[`era-${index}`] ? 'translate-x-0 opacity-100' : 
                    index % 2 === 0 ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'
                  }`}
                >
                  {/* Era Number & Year */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                      {getIcon(era.icon, 32)}
                    </div>
                    <div>
                      <div className="text-orange-400 font-mono text-lg tracking-wider uppercase">
                        Chapter {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-3xl font-bold text-white">{era.year}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                    {era.title}
                  </h2>

                  {/* Description */}
                  <div className="space-y-6">
                    <p className="text-xl text-slate-300 leading-relaxed">
                      {era.description}
                    </p>
                    
                    {era.details && (
                      <div className="bg-slate-800/60 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6">
                        <div className="flex items-center mb-3">
                          <Zap size={20} className="text-orange-400 mr-3" />
                          <span className="text-orange-400 font-semibold">Key Highlight</span>
                        </div>
                        <p className="text-slate-300 italic">{era.details}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Visual Side */}
                <div 
                  className={`transform transition-all duration-1000 delay-400 ${
                    index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                  } ${
                    isVisible[`era-${index}`] ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                  }`}
                >
                  <div className="relative group">
                    {/* Main Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                      
                      {/* Image Placeholder */}
                      <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-600/10"></div>
                        <div className="relative text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                          <div className="mb-4">
                            {getIcon(era.icon, 64)}
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-white">{era.title}</h3>
                          <p className="text-lg opacity-60">{era.year}</p>
                          <div className="mt-6 px-4 py-2 bg-slate-700/50 rounded-full text-sm">
                            📸 Image Placeholder
                          </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-4 left-4 right-4 text-center">
                            <p className="text-white text-sm">Add your photo from this era</p>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-2">{era.title}</div>
                        <div className="text-orange-400 font-semibold">{era.year}</div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Final CTA Section */}
      <section 
        id="final-section"
        data-animate
        className="py-32 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible['final-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-full text-orange-400 font-mono text-sm tracking-wider uppercase backdrop-blur-sm mb-8">
              <Award size={16} className="mr-2" />
              The Journey Continues
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready to Create
              <span className="bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent"> Together?</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Every project is a new chapter in this ongoing story. Let's write the next one together 
              and create something extraordinary that captures your vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Your Project
              </button>
              <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-full hover:bg-slate-700 hover:border-orange-500/50 transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;