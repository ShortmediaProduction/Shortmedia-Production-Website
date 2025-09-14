import React, { useState, useEffect, useRef } from 'react';
import { Camera, Youtube, GraduationCap, Star, Play, ArrowDown, Zap, Award, Heart } from 'lucide-react';
import { mockData } from '../data/mockData';

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeEra, setActiveEra] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const eraRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Determine active era based on scroll position
      const windowHeight = window.innerHeight;
      const scrollPosition = scrolled + windowHeight / 2;
      
      eraRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementTop = scrolled + rect.top;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveEra(index);
          }
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getIcon = (iconType, size = 48) => {
    switch (iconType) {
      case 'camera': return <Camera size={size} />;
      case 'youtube': return <Youtube size={size} />;
      case 'graduation': return <GraduationCap size={size} />;
      case 'star': return <Star size={size} />;
      default: return <Camera size={size} />;
    }
  };

  const eraColors = [
    'from-blue-500 to-purple-600',
    'from-red-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-yellow-600'
  ];

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden" ref={containerRef}>
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
                }}
              ></div>
            ))}
          </div>

          {/* Mouse Follower Effect */}
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-full text-orange-400 font-mono text-sm tracking-wider uppercase backdrop-blur-sm">
              Behind Every Frame
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-white via-orange-300 to-purple-400 bg-clip-text text-transparent">
              The Story
            </span>
            <br />
            <span className="text-white">Behind</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
              Shortmedia
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            From the first click to cinematic mastery - explore the journey of passion, 
            learning, and creative evolution that shaped who I am today.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">2013</div>
              <div className="text-slate-400 text-sm">Journey Started</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">11+</div>
              <div className="text-slate-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-slate-400 text-sm">Passion</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-orange-400">
            <ArrowDown size={24} className="mb-2" />
            <span className="text-xs font-mono tracking-wider uppercase">Explore Journey</span>
          </div>
        </div>
      </section>

      {/* Era Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl p-4">
          <div className="space-y-4">
            {mockData.timeline.map((era, index) => (
              <button
                key={index}
                onClick={() => {
                  eraRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeEra === index
                    ? 'bg-orange-500 border-orange-500 scale-125'
                    : 'border-slate-600 hover:border-orange-400'
                }`}
                title={`${era.year} - ${era.title}`}
              ></button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-slate-400 text-xs text-center">
              {Math.round(scrollProgress)}%
            </div>
          </div>
        </div>
      </div>

      {/* Era Sections */}
      <div className="relative">
        {mockData.timeline.map((era, index) => (
          <section
            key={index}
            ref={(el) => (eraRefs.current[index] = el)}
            className="min-h-screen flex items-center py-20"
            style={{
              background: `linear-gradient(135deg, 
                ${index % 2 === 0 ? 'rgba(15, 23, 42, 0.9)' : 'rgba(30, 41, 59, 0.9)'} 0%, 
                rgba(0, 0, 0, 0.9) 100%
              )`
            }}
          >
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
              }`}>
                
                {/* Content Side */}
                <div className={`space-y-8 ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                  {/* Era Badge */}
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${eraColors[index]} shadow-lg`}>
                      {getIcon(era.icon, 32)}
                    </div>
                    <div>
                      <div className="text-orange-400 font-mono text-sm tracking-wider uppercase">Era {index + 1}</div>
                      <div className="text-2xl font-bold text-white">{era.year}</div>
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
                      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                        <div className="flex items-center mb-3">
                          <Zap size={20} className="text-orange-400 mr-2" />
                          <span className="text-orange-400 font-semibold">Key Highlight</span>
                        </div>
                        <p className="text-slate-300 italic">{era.details}</p>
                      </div>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${eraColors[index]} transition-all duration-1000`}
                        style={{ width: `${activeEra >= index ? 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-400 text-sm font-mono">
                      {String(index + 1).padStart(2, '0')}/04
                    </span>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                  <div className="relative group">
                    {/* Main Image Placeholder */}
                    <div className="aspect-square bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden group-hover:border-orange-500/50 transition-all duration-500">
                      <div className="h-full flex items-center justify-center relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className={`absolute inset-0 bg-gradient-to-br ${eraColors[index]}`}></div>
                        </div>
                        
                        {/* Placeholder Content */}
                        <div className="relative text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                          <div className="mb-6">
                            {getIcon(era.icon, 64)}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{era.title}</h3>
                          <p className="text-lg opacity-60">{era.year}</p>
                          <div className="mt-6 px-4 py-2 bg-slate-700/50 rounded-full text-sm">
                            Image Placeholder
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-white text-sm">Replace with your photo from this era</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-green-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Final Achievement Section */}
      <section className="py-20 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/30 rounded-full text-orange-400 font-mono text-sm tracking-wider uppercase backdrop-blur-sm mb-8">
              <Award size={16} className="mr-2" />
              The Journey Continues
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              More Than Just a Portfolio
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Every project tells a story, every frame captures an emotion, and every client becomes part of the journey. 
              This is just the beginning of what's possible when passion meets purpose.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 group">
              <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Passion Driven</h3>
              <p className="text-slate-300">Every project starts with genuine excitement and ends with pride in the final result.</p>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 group">
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation Focused</h3>
              <p className="text-slate-300">Always exploring new techniques and technologies to push creative boundaries.</p>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 group">
              <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quality Obsessed</h3>
              <p className="text-slate-300">Meticulous attention to detail ensures every frame meets the highest standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;