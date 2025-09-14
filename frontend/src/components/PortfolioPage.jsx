import React, { useState, useEffect } from 'react';
import { X, Play, ExternalLink, Filter, Grid, List } from 'lucide-react';
import { mockData } from '../data/mockData';

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

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
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">My Portfolio</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A showcase of cinematic storytelling and professional video production work
            </p>
          </div>

          {/* Filter and View Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-slate-800 rounded-full p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-full transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className={`${
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-8'
        }`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer animate-on-scroll ${
                viewMode === 'list' ? 'flex gap-6 bg-slate-800/30 rounded-2xl p-6 hover:bg-slate-800/50' : ''
              }`}
              onClick={() => openLightbox(project)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Thumbnail */}
              <div className={`relative overflow-hidden rounded-2xl ${
                viewMode === 'list' ? 'w-1/3 min-w-[300px]' : 'aspect-video'
              } bg-slate-800 border border-slate-700 group-hover:border-orange-500 transition-all duration-300`}>
                
                {/* Video Thumbnail Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <div className="text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                    <Play size={viewMode === 'list' ? 32 : 48} className="mx-auto mb-2" />
                    <p className="text-sm font-medium">Video Thumbnail</p>
                    <p className="text-xs opacity-60">[Replace with project thumbnail]</p>
                  </div>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {project.duration || '2:30'}
                </div>
              </div>

              {/* Project Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-6'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-orange-400 font-semibold text-sm">{project.client}</p>
                  </div>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-orange-400 transition-colors duration-300" />
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>Views: {project.views || '12.5K'}</span>
                  <span>•</span>
                  <span>Year: {project.year || '2024'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-full hover:bg-slate-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
            Load More Projects
          </button>
        </div>
      </div>

      {/* Project Categories Showcase */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What I Create</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Specialized video production across different formats and industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockData.services.map((service, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-900/70 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-orange-400 mb-6">
                  {service.icon === 'camera' && <Play size={48} />}
                  {service.icon === 'film' && <Film size={48} />}
                  {service.icon === 'smartphone' && <Smartphone size={48} />}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>
                <button className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-2 transition-colors duration-300">
                  View Projects <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                <p className="text-orange-400">{selectedProject.client}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="text-slate-400 hover:text-white transition-colors duration-300"
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
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Project Description</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>Client:</span>
                      <span className="text-orange-400">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{selectedProject.duration || '2:30'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span>{selectedProject.year || '2024'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Views:</span>
                      <span>{selectedProject.views || '12.5K'}</span>
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