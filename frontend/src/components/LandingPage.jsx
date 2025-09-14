import React, { useEffect, useRef } from 'react';
import { Play, Camera, Film, Smartphone } from 'lucide-react';
import { mockData } from '../data/mockData';

const LandingPage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #ff6b35 0%, #1e3a8a 70%, #0f172a 100%)'
        }}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="floating-particles"></div>
        </div>

        {/* Hero Content */}
        <div className="text-center z-10 px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight hero-text">
            {mockData.brand.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {mockData.brand.tagline}
          </p>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto">
            <Play size={20} />
            Watch My Work
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
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

          {/* CTA Section */}
          <div className="text-center mt-20 animate-on-scroll">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Create Something Amazing?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with cinematic storytelling and professional video production.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;