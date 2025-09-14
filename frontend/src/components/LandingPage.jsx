import React, { useEffect, useRef, useState } from 'react';
import { Play, Camera, Film, Smartphone, Star, Award, Users, Eye } from 'lucide-react';
import { mockData } from '../data/mockData';

const LandingPage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [apertureProgress, setApertureProgress] = useState(0.5); // Start half-opened
  const [apertureOpen, setApertureOpen] = useState(false);
  const [canScrollVertically, setCanScrollVertically] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!canScrollVertically) {
        // Aperture opening phase - start from 50% and go to 100%
        const scrolled = window.scrollY;
        const maxScroll = window.innerHeight * 0.6; // Reduced scroll distance needed
        const baseProgress = 0.5; // Start at 50%
        const scrollProgress = Math.min(scrolled / maxScroll, 1);
        const totalProgress = baseProgress + (scrollProgress * 0.5); // 50% to 100%
        
        setApertureProgress(totalProgress);
        
        if (totalProgress >= 1 && !apertureOpen) {
          setApertureOpen(true);
          setTimeout(() => {
            setCanScrollVertically(true);
            // Reset scroll and enable normal scrolling
            window.scrollTo(0, 0);
          }, 800);
        }
      }
    };

    // Set up intersection observer for normal page sections
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

    // Observe elements only after aperture is open
    if (canScrollVertically) {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [canScrollVertically, apertureOpen]);

  const apertureBladesStyle = {
    transform: `scale(${1 - apertureProgress})`,
    opacity: apertureOpen ? 0 : 1,
    transition: apertureOpen ? 'opacity 0.8s ease-out' : 'transform 0.1s ease-out'
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section - Sunset at Sea with Aperture */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            linear-gradient(to bottom, 
              #0f172a 0%, 
              #1e293b 60%, 
              #334155 80%, 
              #475569 90%
            )
          `
        }}
      >
        {/* Sunset Gradient positioned at bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 140% 60% at center 100%, 
                #ff6b35 0%, 
                #f59e0b 25%, 
                #ef4444 45%, 
                #7c3aed 65%, 
                transparent 85%
              )
            `
          }}
        ></div>

        {/* Ocean waves effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-slate-800/60 to-transparent">
          <div className="absolute inset-0 opacity-40">
            <div className="wave-animation"></div>
          </div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="floating-particles"></div>
        </div>

        {/* Aperture Blades Overlay */}
        {!apertureOpen && (
          <div className="absolute inset-0 z-30">
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
                clipPath: 'polygon(0 0, 60% 0, 0 60%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-black origin-bottom-left"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(40% 0, 100% 0, 100% 60%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-black origin-top-right"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(0 40%, 60% 100%, 0 100%)'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-black origin-top-left"
              style={{
                ...apertureBladesStyle,
                clipPath: 'polygon(40% 100%, 100% 40%, 100% 100%)'
              }}
            ></div>
          </div>
        )}

        {/* Hero Content */}
        <div 
          className="text-center z-10 px-6"
          style={{
            opacity: apertureProgress, // Start visible at 50% since aperture starts half-open
            transform: `scale(${0.9 + (apertureProgress * 0.1)})`, // Subtle scale effect
            transition: apertureOpen ? 'all 0.8s ease-out' : 'all 0.1s ease-out'
          }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight hero-text gradient-header-text">
            {mockData.brand.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {mockData.brand.tagline}
          </p>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-lg">
            <Play size={20} />
            Watch My Work
          </button>
        </div>

        {/* Aperture Progress Indicator */}
        {!apertureOpen && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
            <div className="flex flex-col items-center text-white">
              <div className="w-20 h-20 border-3 border-orange-400 rounded-full flex items-center justify-center mb-4 relative">
                {/* Camera Aperture Icon */}
                <Camera size={32} className="text-orange-400" />
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(245, 158, 11, 0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - apertureProgress)}`}
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                  />
                </svg>
              </div>
              <span className="text-sm font-mono tracking-wider uppercase mb-2">
                Opening Aperture
              </span>
              <span className="text-xs text-orange-400">
                {Math.round(apertureProgress * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Normal Scroll Indicator - Only visible after aperture opens */}
        {canScrollVertically && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        )}
      </section>

      {/* About Section - Only visible after aperture opens */}
      {canScrollVertically && (
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
      )}

      {/* Achievements Section - Only visible after aperture opens */}
      {canScrollVertically && (
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
      )}

      {/* Customer Feedback Section - Only visible after aperture opens */}
      {canScrollVertically && (
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
      )}

      {/* CTA Section - Only visible after aperture opens */}
      {canScrollVertically && (
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
      )}
    </div>
  );
};

export default LandingPage;