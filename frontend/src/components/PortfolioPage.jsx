import React, { useState, useEffect, useRef } from 'react';
import { X, Play, ExternalLink, Filter, Grid, List, Film, Smartphone, ChevronRight, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const containerRef = useRef(null);

  const openLightbox = (project) => {
    setSelectedProject(project);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const filters = ['All', 'Imagefilm', 'Werbefilm', 'Social Media'];
  
  const filteredProjects = activeFilter === 'All' 
    ? mockData.portfolio.projects 
    : mockData.portfolio.projects.filter(project => 
        project.tags.includes(activeFilter)
      );

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Cinematic Header with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with moving elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black">
          <div className="absolute inset-0 opacity-20">
            {/* Floating film strips */}
            <div className="absolute top-1/4 left-1/4 w-32 h-2 bg-orange-500/30 transform rotate-12 animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-2 bg-orange-500/20 transform -rotate-12 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-2 bg-orange-500/40 transform rotate-45 animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-orange-400 font-mono text-sm tracking-wider uppercase">Explore My Work</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Visual
            </span>
            <br />
            <span className="text-white">Stories</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Each project is a journey. Dive into my collection of cinematic experiences that capture emotions, tell stories, and create lasting impact.
          </p>
          
          {/* Scroll Indicator with Style */}
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-orange-500"></div>
            <span className="text-sm font-mono tracking-wider uppercase">Scroll to Explore</span>
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-orange-500"></div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center animate-bounce">
            <ChevronRight className="text-orange-400 rotate-90" size={24} />
            <ChevronRight className="text-orange-400/60 rotate-90 -mt-2" size={20} />
            <ChevronRight className="text-orange-400/30 rotate-90 -mt-2" size={16} />
          </div>
        </div>
      </section>

      {/* Filter Section with Cinematic Style */}
      <section className="py-16 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Journey</h2>
            <p className="text-slate-400">Filter by experience type</p>
          </div>

          {/* Cinematic Filter Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-8 py-4 rounded-full border transition-all duration-500 group overflow-hidden ${
                  activeFilter === filter
                    ? 'bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/25'
                    : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-orange-500/50'
                }`}
              >
                <span className="relative z-10 font-semibold">{filter}</span>
                {activeFilter !== filter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Experiential Layout */}
      <section className="py-16 bg-slate-900" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
                  index === 0 ? 'lg:col-span-8' : index === 1 ? 'lg:col-span-4' : 
                  index === 2 ? 'lg:col-span-6' : 'lg:col-span-6'
                }`}
                onClick={() => openLightbox(project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-slate-800 border border-slate-700 group-hover:border-orange-500/50 transition-all duration-500">
                  
                  {/* Video Thumbnail with Aspect Ratio */}
                  <div className={`relative ${index === 0 ? 'aspect-video' : 'aspect-square'} bg-gradient-to-br from-slate-700 to-slate-800`}>
                    
                    {/* Placeholder Video Thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                        <Play size={index === 0 ? 64 : 48} className="mx-auto mb-4" />
                        <p className="text-sm font-medium">Video Thumbnail</p>
                        <p className="text-xs opacity-60">[{project.title}]</p>
                      </div>
                    </div>

                    {/* Dynamic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Project Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-orange-400 text-sm font-mono tracking-wider uppercase">
                          {project.tags[0]}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-orange-400 text-sm font-semibold mb-2">{project.client}</p>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {project.views}
                        </span>
                        <span>•</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-mono">
                      {project.duration}
                    </div>

                    {/* Hover Effect Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-orange-500 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 delay-100"></div>
                    </div>
                  </div>

                  {/* Experience Badge for Featured Project */}
                  {index === 0 && (
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Featured Experience
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-full px-8 py-4 hover:from-slate-700 hover:to-slate-600 transition-all duration-300 cursor-pointer group">
              <span className="text-white font-semibold">Explore More Projects</span>
              <ArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Behind Every Frame</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Every project tells a story not just through the final video, but through the creative process, the challenges overcome, and the vision brought to life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.services.map((service, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon === 'camera' && <Play size={48} />}
                  {service.icon === 'film' && <Film size={48} />}
                  {service.icon === 'smartphone' && <Smartphone size={48} />}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>
                <button className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-2 transition-colors duration-300 mx-auto">
                  Explore Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal - Enhanced */}
      {isLightboxOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                <p className="text-orange-400 font-semibold">{selectedProject.client}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="text-slate-400 hover:text-white transition-colors duration-300 p-2 hover:bg-slate-700 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={selectedProject.videoUrl}
                title={selectedProject.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Project Details */}
            <div className="p-6 bg-slate-800/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Project Story</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm border border-orange-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                      <span>Client:</span>
                      <span className="text-orange-400 font-semibold">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                      <span>Duration:</span>
                      <span>{selectedProject.duration}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                      <span>Year:</span>
                      <span>{selectedProject.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Views:</span>
                      <span className="text-green-400 font-semibold">{selectedProject.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;