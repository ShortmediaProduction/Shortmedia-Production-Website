import React, { useEffect, useRef, useState } from 'react';
import { Play, Camera, Film, Smartphone, Star, Award, Users, Eye, PlayCircle, Zap } from 'lucide-react';
import { mockData } from '../data/mockData';

const LandingPage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    // Trigger entrance animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);

    // Cycle through video frames
    const frameInterval = setInterval(() => {
      setActiveFrame(prev => (prev + 1) % 3);
    }, 3000);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearInterval(frameInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Cinematic Hero Section for Videographer */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 140% 60% at center 100%, 
              #ff6b35 0%, 
              #f59e0b 25%, 
              #ef4444 45%, 
              #7c3aed 65%, 
              transparent 85%
            ),
            linear-gradient(to bottom, 
              #0f172a 0%, 
              #1e293b 60%, 
              #334155 80%, 
              #475569 90%
            )
          `
        }}
      >
        {/* Cinematic Letterbox Bars */}
        <div 
          className={`absolute top-0 left-0 right-0 h-20 bg-black z-20 transition-transform duration-2000 ease-out ${
            isLoaded ? 'transform translate-y-0' : 'transform -translate-y-full'
          }`}
        >
          <div className="absolute bottom-2 left-4 text-orange-400 font-mono text-xs tracking-wider">
            REC • SHORTMEDIA
          </div>
          <div className="absolute bottom-2 right-4 text-orange-400 font-mono text-xs">
            4K • 24fps
          </div>
        </div>
        
        <div 
          className={`absolute bottom-0 left-0 right-0 h-20 bg-black z-20 transition-transform duration-2000 ease-out ${
            isLoaded ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <div className="absolute top-2 left-4 text-orange-400 font-mono text-xs tracking-wider">
            TC: 00:00:00:00
          </div>
          <div className="absolute top-2 right-4 text-orange-400 font-mono text-xs">
            ISO 100 • f/2.8
          </div>
        </div>

        {/* Film Strip Decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-black z-10 opacity-70">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-8 h-4 bg-orange-400/30 mx-auto my-2 rounded-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
        
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-black z-10 opacity-70">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-8 h-4 bg-orange-400/30 mx-auto my-2 rounded-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>

        {/* Floating Video Frames */}
        <div className="absolute inset-0 z-5">
          {/* Frame 1 */}
          <div 
            className={`absolute top-1/4 left-1/4 w-32 h-20 bg-slate-800/80 border-2 border-orange-400/50 rounded-lg backdrop-blur-sm transition-all duration-1000 ${
              activeFrame === 0 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <Play size={24} className="text-orange-400" />
            </div>
            <div className="absolute -bottom-6 left-0 text-orange-400 text-xs font-mono">
              Project_01.mp4
            </div>
          </div>

          {/* Frame 2 */}
          <div 
            className={`absolute top-3/4 right-1/4 w-32 h-20 bg-slate-800/80 border-2 border-purple-400/50 rounded-lg backdrop-blur-sm transition-all duration-1000 ${
              activeFrame === 1 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <Film size={24} className="text-purple-400" />
            </div>
            <div className="absolute -bottom-6 left-0 text-purple-400 text-xs font-mono">
              Brand_Film.mp4
            </div>
          </div>

          {/* Frame 3 */}
          <div 
            className={`absolute top-1/2 right-1/3 w-32 h-20 bg-slate-800/80 border-2 border-blue-400/50 rounded-lg backdrop-blur-sm transition-all duration-1000 ${
              activeFrame === 2 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <Camera size={24} className="text-blue-400" />
            </div>
            <div className="absolute -bottom-6 left-0 text-blue-400 text-xs font-mono">
              Social_Ad.mp4
            </div>
          </div>
        </div>

        {/* Lens Flare Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-60 animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-blue-400/50 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Main Content */}
        <div 
          className={`text-center z-30 px-6 transition-all duration-2000 ease-out delay-500 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          {/* Video Title Style Header */}
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-2 bg-black/50 backdrop-blur-md border border-orange-400/30 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-orange-400 font-mono text-sm tracking-wider uppercase">
                Now Playing: Director's Cut
              </span>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tight text-white leading-none">
            <span className="block mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              SHORT
            </span>
            <span className="block text-white">MEDIA</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Cinematic storytelling that captures hearts, minds, and moments that matter most.
          </p>

          {/* Main CTA - Large Play Button */}
          <div className="flex flex-col items-center">
            <button className="group relative w-32 h-32 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 shadow-2xl mb-6">
              <PlayCircle size={64} className="text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </button>
            
            <div className="text-center">
              <div className="text-white font-semibold mb-2">Watch Showreel</div>
              <div className="text-slate-400 text-sm font-mono">Duration: 2:30 • 4K Quality</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
          <div className="flex flex-col items-center text-orange-400">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center mb-2">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-xs font-mono tracking-wider uppercase">Scroll Down</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {mockData.about.description}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {mockData.services.map((service, index) => (
              <div 
                key={index}
                className="animate-on-scroll bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon === 'camera' && <Camera size={48} />}
                  {service.icon === 'film' && <Film size={48} />}
                  {service.icon === 'smartphone' && <Smartphone size={48} />}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Achievements</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Numbers that reflect my commitment to excellence in video production
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {mockData.achievements.map((achievement, index) => (
              <div 
                key={index}
                className="animate-on-scroll text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-400 mb-4 flex justify-center">
                  {achievement.icon === 'projects' && <Film size={48} />}
                  {achievement.icon === 'clients' && <Users size={48} />}
                  {achievement.icon === 'views' && <Eye size={48} />}
                  {achievement.icon === 'awards' && <Award size={48} />}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-slate-300 font-semibold">{achievement.label}</div>
                <div className="text-sm text-slate-400 mt-2">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Feedback Section */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Client Feedback</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              What my clients say about working with Shortmedia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockData.testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="animate-on-scroll bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={`${i < testimonial.rating ? 'text-orange-400 fill-orange-400' : 'text-slate-600'}`} 
                    />
                  ))}
                </div>
                <blockquote className="text-slate-300 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.position}</div>
                    <div className="text-orange-400 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center animate-on-scroll">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's bring your vision to life with cinematic storytelling and professional video production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your Project
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;