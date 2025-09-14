import React, { useState, useEffect, useRef } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import { mockData } from '../data/mockData';

const PortfolioPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-black pt-20 overflow-hidden" ref={containerRef}>
      {/* Portfolio Header */}
      <div className="relative z-10 text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">My Work</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Discover my projects by exploring the gallery with your cursor
        </p>
      </div>

      {/* Flashlight Effect Container */}
      <div className="relative min-h-screen">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/90 z-10 pointer-events-none">
          {/* Spotlight Effect */}
          <div
            className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-100 ease-out"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              background: `radial-gradient(circle, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.95) 100%)`,
              boxShadow: `0 0 0 9999px rgba(0,0,0,0.9)`,
              clipPath: 'circle(200px at center)'
            }}
          ></div>
        </div>

        {/* Portfolio Grid */}
        <div className="relative z-0 grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto">
          {mockData.portfolio.projects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item group cursor-pointer"
              onClick={() => openLightbox(project)}
              style={{
                transform: `translate(${index * 20}px, ${index * 30}px)`
              }}
            >
              {/* Project Thumbnail */}
              <div className="relative bg-slate-800 rounded-2xl overflow-hidden border-2 border-slate-700 hover:border-orange-500 transition-all duration-300 transform group-hover:scale-105">
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <div className="text-center text-slate-400 group-hover:text-orange-400 transition-colors duration-300">
                    <Play size={48} className="mx-auto mb-2" />
                    <p className="text-sm">Video Thumbnail Placeholder</p>
                    <p className="text-xs opacity-60">Replace with project thumbnail</p>
                  </div>
                </div>

                {/* Project Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-orange-400 text-sm font-semibold mb-2">{project.client}</p>
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Project Title Below */}
              <div className="text-center mt-4">
                <h3 className="text-white font-semibold text-lg group-hover:text-orange-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm">{project.client}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden additional projects for variety */}
        <div className="absolute top-1/4 left-1/4 w-64 h-40 bg-slate-800 rounded-lg border border-slate-700 opacity-30">
          <div className="p-4 h-full flex items-center justify-center">
            <div className="text-center text-slate-500">
              <Play size={32} className="mx-auto mb-2" />
              <p className="text-sm">Additional Project</p>
            </div>
          </div>
        </div>

        <div className="absolute top-3/4 right-1/4 w-64 h-40 bg-slate-800 rounded-lg border border-slate-700 opacity-30">
          <div className="p-4 h-full flex items-center justify-center">
            <div className="text-center text-slate-500">
              <Play size={32} className="mx-auto mb-2" />
              <p className="text-sm">Additional Project</p>
            </div>
          </div>
        </div>
      </div>

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
              <p className="text-slate-300 text-lg mb-4">{selectedProject.description}</p>
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
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="fixed bottom-6 left-6 text-slate-400 text-sm z-20">
        <p>Move your cursor to explore the gallery</p>
      </div>
    </div>
  );
};

export default PortfolioPage;