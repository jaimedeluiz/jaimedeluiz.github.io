import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderCard } from './FolderCard';
import { ProjectOverlay } from './ProjectOverlay';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types/portfolio';

export const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: language === 'en' ? 'All Projects' : 'Todos los Proyectos' },
    { id: 'systems', label: language === 'en' ? 'Systems & Low-Latency' : 'Sistemas y Baja Latencia' },
    { id: 'distributed', label: language === 'en' ? 'Distributed Systems' : 'Sistemas Distribuidos' },
    { id: 'fullstack', label: language === 'en' ? 'Full-Stack & AI' : 'Full-Stack e IA' },
    { id: 'opensource', label: language === 'en' ? 'Open Source' : 'Open Source' },
  ];

  const filteredProjects = portfolioData.projects.filter((project) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'systems') return project.id === 'matching-engine';
    if (selectedFilter === 'distributed') return project.id === 'distributed-rate-limiter';
    if (selectedFilter === 'fullstack') return project.id === 'fairshare' || project.id === 'outfeed' || project.id === 'barbershop-planner';
    if (selectedFilter === 'opensource') return project.id === 'checkstyle';
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            {language === 'en' ? '01 / Portfolio' : '01 / Portafolio'}
          </span>
          <span className="text-border-strong">•</span>
          <span className="text-xs font-mono text-fg-muted">
            {portfolioData.projects.length} {language === 'en' ? 'Featured Works' : 'Proyectos'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg-primary">
              {language === 'en' ? 'Featured Engineering Projects' : 'Proyectos de Ingeniería'}
            </h2>
            <p className="text-base text-fg-secondary max-w-2xl mt-2">
              {language === 'en'
                ? 'Architected for deterministic performance, high throughput, and zero-allocation efficiency. Hover for live mini-telemetry, click to open full case studies.'
                : 'Arquitecturas diseñadas para rendimiento determinista, alto throughput y cero reservas en la ruta crítica. Pasa el cursor para ver telemetría en vivo, haz clic para el caso de estudio.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-end bg-bg-secondary p-1 rounded-xl border border-border">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all interactive ${
                  selectedFilter === filter.id
                    ? 'bg-accent text-white font-medium shadow-sm'
                    : 'text-fg-muted hover:text-fg-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <FolderCard
            key={project.id}
            project={project}
            index={index}
            onSelect={(p) => setSelectedProject(p)}
          />
        ))}
      </motion.div>

      {/* Case Study Full-Screen Modal Overlay */}
      <ProjectOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

