import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, CheckCircle2, ArrowRight, Layers, Cpu, Award } from 'lucide-react';
import { Project } from '../types/portfolio';
import { useLanguage } from '../context/LanguageContext';

interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ project, onClose }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-bg-secondary border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-tertiary/60">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-accent-soft text-accent border border-accent/20">
                {project.category[language]}
              </span>
              <span className="hidden sm:inline text-xs font-mono text-fg-muted">
                {project.badge.text}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-secondary text-xs font-mono text-fg-primary hover:border-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-accent" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-fg-muted" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-border bg-bg-secondary text-fg-muted hover:text-fg-primary hover:border-border-strong transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-10">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-fg-primary">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-fg-secondary leading-relaxed font-sans">
                {project.subtitle[language]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg-tertiary border border-border text-fg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-xl border border-border/80 bg-bg-tertiary/40 flex flex-col justify-between"
                >
                  <span className="font-mono text-2xl font-bold text-accent">
                    {metric.value}
                  </span>
                  <span className="text-xs text-fg-muted font-mono mt-1">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem Statement */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <Layers className="w-4 h-4" />
                <span>{language === 'en' ? 'The Problem' : 'El Problema'}</span>
              </div>
              <p className="text-sm sm:text-base text-fg-secondary leading-relaxed bg-bg-tertiary/30 p-5 rounded-xl border border-border/60">
                {caseStudy.problem[language]}
              </p>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <Cpu className="w-4 h-4" />
                <span>{language === 'en' ? 'System Architecture' : 'Arquitectura del Sistema'}</span>
              </div>
              <p className="text-sm text-fg-secondary leading-relaxed">
                {caseStudy.architecture[language]}
              </p>

              {/* Step Flow Diagram Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {caseStudy.architecture.steps.map((step, idx) => (
                  <div
                    key={step.name}
                    className="p-4 rounded-xl border border-border bg-bg-tertiary/50 flex flex-col gap-1.5 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent">
                        Step 0{idx + 1}
                      </span>
                      {step.subtext && (
                        <span className="text-[10px] font-mono text-fg-muted">
                          {step.subtext}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm text-fg-primary">
                      {step.name}
                    </h4>
                    <p className="text-xs text-fg-secondary leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Decisions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <Award className="w-4 h-4" />
                <span>{language === 'en' ? 'Key Decisions' : 'Decisiones Clave'}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.keyDecisions[language].map((decision) => (
                  <div
                    key={decision.title}
                    className="p-4 rounded-xl border border-border/80 bg-bg-secondary space-y-1.5"
                  >
                    <h5 className="font-semibold text-sm text-fg-primary flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{decision.title}</span>
                    </h5>
                    <p className="text-xs text-fg-secondary leading-relaxed pl-5">
                      {decision.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results & Verification */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{language === 'en' ? 'Verified Results' : 'Resultados Verificados'}</span>
              </div>
              <ul className="space-y-2.5">
                {caseStudy.results[language].map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-fg-secondary bg-bg-tertiary/40 p-3 rounded-lg border border-border/50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links and Repositories */}
            {caseStudy.links.length > 0 && (
              <div className="pt-4 border-t border-border flex flex-wrap gap-3">
                {caseStudy.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-medium font-mono transition-colors shadow-sm"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
