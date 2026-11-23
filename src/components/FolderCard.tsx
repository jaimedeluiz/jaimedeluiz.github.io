import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Github, ExternalLink, Tag, ShieldCheck, BookOpen } from 'lucide-react';
import { Project } from '../types/portfolio';
import { useLanguage } from '../context/LanguageContext';

interface FolderCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ project, index, onSelect }) => {
  const { language } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col rounded-2xl border border-border bg-bg-secondary hover:border-accent/40 transition-all duration-300 spotlight-card shadow-card-light dark:shadow-card-dark overflow-hidden"
    >
      {/* Folder Tab Notch Header */}
      <div className="flex items-center justify-between px-5 pt-3.5 pb-2.5 border-b border-border/40 bg-bg-tertiary/40">
        <div className="flex items-center gap-2">
          <Folder className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-[11px] font-semibold text-fg-muted uppercase tracking-wider">
            {`[0${index + 1}]`} {project.category[language]}
          </span>
        </div>

        {/* Metric badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-soft border border-accent/20 text-accent font-mono text-[11px] font-medium">
          <ShieldCheck className="w-3 h-3" />
          <span>{project.badge.text}</span>
        </div>
      </div>

      {/* Main Folder Content */}
      <div className="p-6 flex flex-col justify-between flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            {/* Title linking directly to GitHub */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl font-bold tracking-tight text-fg-primary hover:text-accent transition-colors flex items-center gap-2 group/title"
              title={language === 'en' ? 'Open repository on GitHub' : 'Abrir repositorio en GitHub'}
            >
              <span>{project.title}</span>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover/title:opacity-100 transition-opacity shrink-0" />
            </a>

            {/* Direct GitHub Action Button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-bg-tertiary hover:bg-accent hover:text-white hover:border-accent text-fg-primary text-xs font-mono font-medium transition-all shrink-0 shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub ↗</span>
              </a>
            )}
          </div>

          <p className="text-sm text-fg-secondary leading-relaxed">
            {project.subtitle[language]}
          </p>
        </div>

        {/* Calm, Static Engineering Metrics / Spec Grid (zero jitter/flashing) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-bg-primary border border-border/50">
          {project.metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="font-mono text-base font-bold text-accent">
                {metric.value}
              </span>
              <span className="font-mono text-[10px] text-fg-muted mt-0.5 truncate">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Tags + Case Study Modal Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-fg-muted bg-bg-tertiary border border-border/50"
              >
                <Tag className="w-2.5 h-2.5 text-accent/70" />
                {tag}
              </span>
            ))}
          </div>

          {/* Case study modal button */}
          <button
            onClick={() => onSelect(project)}
            className="flex items-center gap-1.5 text-xs font-mono text-fg-muted hover:text-accent font-medium transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Case Study' : 'Caso de Estudio'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
